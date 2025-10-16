package com.example.journal.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Menu
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.example.journal.data.JournalEntry
import com.example.journal.ui.ListViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen(
    viewModel: ListViewModel,
    onOpen: (Int) -> Unit,
    onCreate: () -> Unit,
    navController: NavHostController
) {
    val entries by viewModel.uiState.collectAsState()
    val tags by viewModel.tags.collectAsState()
    var showDialog = androidx.compose.runtime.remember { androidx.compose.runtime.mutableStateOf(false) }
    var newTag = androidx.compose.runtime.remember { androidx.compose.runtime.mutableStateOf("") }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Journal", fontWeight = FontWeight.Bold) },
                navigationIcon = { IconButton(onClick = { }) { Icon(Icons.Default.Menu, contentDescription = "menu") } },
                actions = { IconButton(onClick = { }) { Icon(Icons.Default.Search, contentDescription = "search") } }
            )
        },
        floatingActionButton = {
            FloatingActionButton(onClick = onCreate) { Icon(Icons.Default.Edit, contentDescription = "new") }
        }
    ) { padding ->
        Column(modifier = Modifier.fillMaxSize().padding(padding).padding(12.dp)) {
            Button(
                onClick = { navController.navigate("calendar") },
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 8.dp)
            ) {
                Text("📅 View Streak Calendar")
            }
            Spacer(Modifier.height(8.dp))

            LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                items(tags) { label ->
                    FilterChip(
                        selected = false,
                        onClick = { viewModel.setTag(label) },
                        label = { Text(label) }
                    )
                }
                item {
                    AssistChip(onClick = { showDialog.value = true }, label = { Text("Add") }, leadingIcon = { Icon(Icons.Default.Add, contentDescription = "add") })
                }
            }
            Spacer(Modifier.height(12.dp))

            LazyColumn(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                items(entries) { entry ->
                    JournalCard(entry = entry, onClick = { onOpen(entry.id) })
                }
            }
        }
        if (showDialog.value) {
            AlertDialog(
                onDismissRequest = { showDialog.value = false },
                confirmButton = {
                    TextButton(onClick = {
                        viewModel.addTag(newTag.value)
                        newTag.value = ""
                        showDialog.value = false
                    }) { Text("Add") }
                },
                dismissButton = { TextButton(onClick = { showDialog.value = false }) { Text("Cancel") } },
                title = { Text("New Filter") },
                text = {
                    OutlinedTextField(value = newTag.value, onValueChange = { newTag.value = it }, placeholder = { Text("Name") })
                }
            )
        }
    }
}

@Composable
private fun JournalCard(entry: JournalEntry, onClick: () -> Unit) {
    Surface(shape = MaterialTheme.shapes.large, tonalElevation = 1.dp, modifier = Modifier.fillMaxWidth()) {
        Column(modifier = Modifier.clickable(onClick = onClick).padding(16.dp)) {
            Text(entry.title, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
            Spacer(Modifier.height(6.dp))
            Text(entry.content.take(80), style = MaterialTheme.typography.bodyMedium)
            Spacer(Modifier.height(6.dp))
            Row(modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                AssistChip(onClick = {}, label = { Text(entry.tag) })
                Spacer(Modifier.weight(1f))
                Text(entry.timestamp, style = MaterialTheme.typography.labelMedium)
            }
        }
    }
}


