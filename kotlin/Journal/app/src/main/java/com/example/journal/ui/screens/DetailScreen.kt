package com.example.journal.ui.screens

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.journal.data.JournalEntry
import com.example.journal.data.JournalRepository
import com.example.journal.ui.richtext.parseSimpleMarkdown
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DetailScreen(
    id: Int,
    repository: JournalRepository,
    onEdit: () -> Unit,
    onBack: () -> Unit
) {
    val state = remember { mutableStateOf<JournalEntry?>(null) }
    LaunchedEffect(id) { state.value = repository.getById(id) }

    val scope = rememberCoroutineScope()

    Scaffold(topBar = {
        TopAppBar(
            title = { Text(state.value?.title ?: "Entry") },
            navigationIcon = { IconButton(onClick = onBack) { Icon(Icons.Default.ArrowBack, contentDescription = "back") } },
            actions = {
                IconButton(onClick = onEdit) { Icon(Icons.Default.Edit, contentDescription = "edit") }
                val entry = state.value
                if (entry != null) {
                    IconButton(onClick = {
                        scope.launch {
                            repository.delete(entry)
                            onBack()
                        }
                    }) { Icon(Icons.Default.Delete, contentDescription = "delete") }
                }
            }
        )
    }) { padding ->
        Column(modifier = Modifier.fillMaxSize().padding(padding).padding(16.dp)) {
            val entry = state.value
            Text(entry?.title.orEmpty(), style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold)
            Spacer(Modifier.height(8.dp))
            val base = MaterialTheme.typography.bodyLarge
            // Render markdown-like spans
            Text(parseSimpleMarkdown(entry?.content.orEmpty()), style = base)
            Spacer(Modifier.height(12.dp))
            Text(entry?.timestamp.orEmpty(), style = MaterialTheme.typography.labelMedium)
        }
    }
}


