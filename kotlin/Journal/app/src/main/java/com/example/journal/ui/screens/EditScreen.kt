package com.example.journal.ui.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.FormatBold
import androidx.compose.material.icons.filled.FormatItalic
import androidx.compose.material.icons.filled.FormatUnderlined
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.journal.data.JournalRepository
import com.example.journal.ui.EditViewModel
import com.example.journal.ui.richtext.parseSimpleMarkdown
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun EditScreen(
    id: Int?,
    viewModel: EditViewModel,
    repository: JournalRepository,
    tagsProvider: () -> List<String> = { listOf("All", "Temp", "Winter Arc") },
    onDone: (Int) -> Unit,
    onBack: () -> Unit
) {
    val title by viewModel.title.collectAsState()
    val content by viewModel.content.collectAsState()
    val tag by viewModel.tag.collectAsState()
    val timestamp by viewModel.timestamp.collectAsState()
    val boldState by viewModel.bold.collectAsState()
    val italicState by viewModel.italic.collectAsState()
    val underlineState by viewModel.underline.collectAsState()

    val scope = rememberCoroutineScope()

    LaunchedEffect(id) {
        if (id != null) {
            repository.getById(id)?.let { viewModel.load(it) }
        }
    }

    var bold by remember { mutableStateOf(boldState) }
    var italic by remember { mutableStateOf(italicState) }
    var underline by remember { mutableStateOf(underlineState) }

    val baseStyle = MaterialTheme.typography.bodyLarge
    val style = TextStyle(
        fontWeight = if (bold) FontWeight.Bold else baseStyle.fontWeight,
        fontStyle = if (italic) FontStyle.Italic else baseStyle.fontStyle,
    )

    Scaffold(topBar = {
        TopAppBar(
            title = { Text(if (id == null) "New Note" else "Edit Note") },
            navigationIcon = { IconButton(onClick = onBack) { Icon(Icons.Default.ArrowBack, contentDescription = "back") } },
            actions = {
                IconButton(onClick = {
                    viewModel.bold.value = bold
                    viewModel.italic.value = italic
                    viewModel.underline.value = underline
                    viewModel.save(id, timeProvider = { currentTimestamp() }) { savedId ->
                        if (id == null) viewModel.clear()
                        onDone(savedId)
                    }
                }) { Icon(Icons.Default.Check, contentDescription = "save") }
                if (id != null) {
                    IconButton(onClick = {
                        viewModel.delete(id) { onBack() }
                    }) { Icon(Icons.Default.Delete, contentDescription = "delete") }
                }
            }
        )
    }) { padding ->
        Column(modifier = Modifier.fillMaxSize().padding(padding).padding(12.dp)) {
            OutlinedTextField(
                value = title,
                onValueChange = { viewModel.title.value = it },
                modifier = Modifier.fillMaxWidth(),
                placeholder = { Text("Title") }
            )
            Spacer(Modifier.height(8.dp))
            LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                items(tagsProvider()) { label ->
                    FilterChip(selected = tag == label, onClick = { viewModel.tag.value = label }, label = { Text(label) })
                }
            }
            Spacer(Modifier.height(8.dp))
            // Toolbar
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                IconButton(onClick = { viewModel.content.value = wrapSelection(viewModel.content.value, "**") }) { Icon(Icons.Default.FormatBold, contentDescription = "B") }
                IconButton(onClick = { viewModel.content.value = wrapSelection(viewModel.content.value, "_") }) { Icon(Icons.Default.FormatItalic, contentDescription = "I") }
                IconButton(onClick = { viewModel.content.value = wrapSelection(viewModel.content.value, "~") }) { Icon(Icons.Default.FormatUnderlined, contentDescription = "U") }
            }
            Spacer(Modifier.height(8.dp))
            OutlinedTextField(
                value = content,
                onValueChange = { viewModel.content.value = it },
                modifier = Modifier.fillMaxWidth().weight(1f),
                placeholder = { Text("Write something...") },
                textStyle = style,
                singleLine = false,
                minLines = 8
            )
            Spacer(Modifier.height(8.dp))
            Text(parseSimpleMarkdown(content), style = MaterialTheme.typography.bodyMedium)
            Text(timestamp.ifBlank { currentTimestamp() }, style = MaterialTheme.typography.labelMedium)
        }
    }
}

private fun wrapSelection(current: String, token: String): String {
    if (current.isBlank()) return "$token$token"
    val lastSpace = current.lastIndexOf(' ')
    return if (lastSpace == -1) "$token$current$token" else current.substring(0, lastSpace + 1) + token + current.substring(lastSpace + 1) + token
}

private fun currentTimestamp(): String {
    val sdf = SimpleDateFormat("d/M/yy - h:mm a", Locale.getDefault())
    return sdf.format(Date())
}


