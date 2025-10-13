package com.example.journal.data

import androidx.room.Entity
import androidx.room.PrimaryKey
import org.threeten.bp.LocalDate

@Entity(tableName = "entries")
data class JournalEntry(
    @PrimaryKey(autoGenerate = true) val id: Int = 0,
    val title: String,
    val content: String,
    val timestamp: String,
    val tag: String,
    val bold: Boolean = false,
    val italic: Boolean = false,
    val underline: Boolean = false,

    val date: LocalDate = LocalDate.now()
)


