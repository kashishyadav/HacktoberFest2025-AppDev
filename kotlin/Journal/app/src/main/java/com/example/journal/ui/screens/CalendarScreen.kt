package com.example.journal.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.ArrowForward
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.journal.ui.ListViewModel
import org.threeten.bp.LocalDate
import org.threeten.bp.YearMonth


@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CalendarScreen(
    viewModel: ListViewModel = viewModel(),
    onBack: () -> Unit = {}
) {
    val today = remember { LocalDate.now() }
    var currentMonth by remember { mutableStateOf(YearMonth.now()) }
    val entries = viewModel.getEntriesForMonth(currentMonth)
    val daysInMonth = currentMonth.lengthOfMonth()
    val firstDayOfWeek = currentMonth.atDay(1).dayOfWeek.value

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Text(
                        text = "${currentMonth.month.name.lowercase().replaceFirstChar { it.uppercase() }} ${currentMonth.year}",
                        fontWeight = FontWeight.Bold
                    )
                },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(
                            imageVector = Icons.Filled.ArrowBack,
                            contentDescription = "Back"
                        )
                    }
                },
                actions = {
                    IconButton(onClick = { currentMonth = currentMonth.minusMonths(1) }) {
                        Icon(Icons.Filled.ArrowBack, contentDescription = "Previous")
                    }
                    IconButton(onClick = { currentMonth = currentMonth.plusMonths(1) }) {
                        Icon(Icons.Filled.ArrowForward, contentDescription = "Next")
                    }
                }
            )
        }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .padding(paddingValues)
                .fillMaxSize()
                .padding(16.dp)
        ) {
            LazyVerticalGrid(
                columns = GridCells.Fixed(7),
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.Center,
                content = {
                    // Empty boxes before month starts
                    items(maxOf(0, firstDayOfWeek - 1)) {
                        Box(modifier = Modifier.size(40.dp))
                    }

                    // Actual calendar days
                    items(daysInMonth) { index ->
                        val day = index + 1
                        val date = currentMonth.atDay(day)
                        val hasEntry = entries.contains(date)
                        val isToday = date == today

                        Box(
                            modifier = Modifier
                                .size(42.dp)
                                .clip(CircleShape)
                                .background(
                                    when {
                                        hasEntry -> Color(0xFF4CAF50) // Green = streak day
                                        isToday -> Color(0xFF64B5F6) // Blue = today
                                        else -> Color.Transparent
                                    }
                                )
                                .border(1.dp, Color.Gray, CircleShape)
                                .padding(4.dp),
                            contentAlignment = Alignment.Center
                        ) {
                            Text(
                                text = "$day",
                                color = if (hasEntry) Color.White else Color.Black,
                                fontSize = 14.sp
                            )
                        }
                    }
                }
            )

            Spacer(modifier = Modifier.height(24.dp))

            // Streak summary section
            val streak = calculateCurrentStreak(entries)
            Text(
                text = "🔥 Current Streak: $streak days",
                fontSize = 18.sp,
                fontWeight = FontWeight.Bold,
                color = if (streak > 0) Color(0xFF2E7D32) else Color.Gray
            )
        }
    }
}

fun calculateCurrentStreak(dates: List<LocalDate>): Int {
    if (dates.isEmpty()) return 0
    val sorted = dates.sortedDescending()
    var streak = 1
    for (i in 0 until sorted.size - 1) {
        if (sorted[i].minusDays(1) == sorted[i + 1]) streak++
        else break
    }
    return streak
}
