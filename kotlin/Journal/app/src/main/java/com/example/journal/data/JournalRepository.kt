package com.example.journal.data

import kotlinx.coroutines.flow.Flow

class JournalRepository(private val dao: JournalDao) {
    fun observeAll(): Flow<List<JournalEntry>> = dao.observeAll()
    fun search(query: String): Flow<List<JournalEntry>> = dao.search("%$query%")
    suspend fun getById(id: Int): JournalEntry? = dao.getById(id)
    suspend fun upsert(entry: JournalEntry): Long = dao.upsert(entry)
    suspend fun delete(entry: JournalEntry) = dao.delete(entry)
}


