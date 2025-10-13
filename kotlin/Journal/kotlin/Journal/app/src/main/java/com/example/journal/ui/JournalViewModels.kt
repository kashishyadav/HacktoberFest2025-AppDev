package com.example.journal.ui

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.example.journal.data.JournalEntry
import com.example.journal.data.JournalRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

class ListViewModel(private val repository: JournalRepository) : ViewModel() {
    private val query = MutableStateFlow("")
    private val tagFilter = MutableStateFlow("All")
    private val _tags = MutableStateFlow(listOf("All", "Temp", "Winter Arc"))
    val tags: StateFlow<List<String>> = _tags

    private val allFlow = repository.observeAll()

    val uiState: StateFlow<List<JournalEntry>> =
        combine(allFlow, query, tagFilter) { list, q, tag ->
            list.filter { entry ->
                val matchesQuery = q.isBlank() ||
                    entry.title.contains(q, ignoreCase = true) ||
                    entry.content.contains(q, ignoreCase = true)
                val matchesTag = tag == "All" || entry.tag.equals(tag, ignoreCase = true)
                matchesQuery && matchesTag
            }
        }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyList())

    fun setQuery(value: String) { query.value = value }
    fun setTag(value: String) { tagFilter.value = value }
    fun addTag(name: String) {
        val trimmed = name.trim()
        if (trimmed.isNotEmpty() && !_tags.value.contains(trimmed)) {
            _tags.value = _tags.value + trimmed
            setTag(trimmed)
        }
    }
}

class EditViewModel(private val repository: JournalRepository) : ViewModel() {
    val title = MutableStateFlow("")
    val content = MutableStateFlow("")
    val tag = MutableStateFlow("Temp")
    val timestamp = MutableStateFlow("")
    val bold = MutableStateFlow(false)
    val italic = MutableStateFlow(false)
    val underline = MutableStateFlow(false)

    fun load(entry: JournalEntry?) {
        if (entry != null) {
            title.value = entry.title
            content.value = entry.content
            tag.value = entry.tag
            timestamp.value = entry.timestamp
            bold.value = entry.bold
            italic.value = entry.italic
            underline.value = entry.underline
        }
    }

    fun save(id: Int? = null, timeProvider: () -> String, onSaved: (Int) -> Unit) {
        viewModelScope.launch {
            val entry = JournalEntry(
                id = id ?: 0,
                title = title.value.trim(),
                content = content.value.trim(),
                timestamp = if (timestamp.value.isBlank()) timeProvider() else timestamp.value,
                tag = tag.value,
                bold = bold.value,
                italic = italic.value,
                underline = underline.value
            )
            val newId = repository.upsert(entry).toInt()
            onSaved(if (id == null) newId else id)
        }
    }

    fun delete(id: Int, onDeleted: () -> Unit) {
        viewModelScope.launch {
            repository.getById(id)?.let { repository.delete(it) }
            onDeleted()
        }
    }

    fun clear() {
        title.value = ""
        content.value = ""
        tag.value = "Temp"
        timestamp.value = ""
        bold.value = false
        italic.value = false
        underline.value = false
    }
}

class VmFactory(private val repo: JournalRepository) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(ListViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return ListViewModel(repo) as T
        }
        if (modelClass.isAssignableFrom(EditViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return EditViewModel(repo) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}


