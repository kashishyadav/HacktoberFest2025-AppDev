package com.example.journal.ui.navigation

import androidx.compose.animation.AnimatedContentTransitionScope
import androidx.compose.animation.ExperimentalAnimationApi
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.journal.data.JournalEntry
import com.example.journal.data.JournalRepository
import com.example.journal.ui.EditViewModel
import com.example.journal.ui.ListViewModel
import com.example.journal.ui.VmFactory
import com.example.journal.ui.screens.DetailScreen
import com.example.journal.ui.screens.EditScreen
import com.example.journal.ui.screens.HomeScreen

object Routes {
    const val Home = "home"
    const val Detail = "detail/{id}"
    const val Edit = "edit?entryId={entryId}"
}

@Composable
fun rememberJournalNavController(): NavHostController = rememberNavController()

@Composable
fun JournalNavHost(
    navController: NavHostController,
    repository: JournalRepository,
    modifier: Modifier = Modifier
) {
    val factory = VmFactory(repository)
    val listVm: ListViewModel = viewModel(factory = factory)
    val editVm: EditViewModel = viewModel(factory = factory)

    NavHost(navController = navController, startDestination = Routes.Home, modifier = modifier) {
        composable(Routes.Home,
            enterTransition = { slideIntoContainer(AnimatedContentTransitionScope.SlideDirection.Left) },
            exitTransition = { slideOutOfContainer(AnimatedContentTransitionScope.SlideDirection.Left) }
        ) {
            HomeScreen(
                viewModel = listVm,
                onOpen = { id -> navController.navigate("detail/$id") },
                onCreate = { navController.navigate("edit?entryId=-1") }
            )
        }
        composable(Routes.Detail) { backStackEntry ->
            val id = backStackEntry.arguments?.getString("id")?.toIntOrNull() ?: -1
            DetailScreen(
                id = id,
                repository = repository,
                onEdit = { navController.navigate("edit?entryId=$id") },
                onBack = { navController.popBackStack() }
            )
        }
        composable("edit?entryId={entryId}") { backStackEntry ->
            val entryId = backStackEntry.arguments?.getString("entryId")?.toIntOrNull() ?: -1
            if (entryId < 0) editVm.clear()
            EditScreen(
                id = if (entryId >= 0) entryId else null,
                viewModel = editVm,
                repository = repository,
                tagsProvider = { listVm.tags.value },
                onDone = { savedId ->
                    navController.popBackStack()
                    navController.navigate("detail/$savedId")
                },
                onBack = { navController.popBackStack() }
            )
        }
    }
}


