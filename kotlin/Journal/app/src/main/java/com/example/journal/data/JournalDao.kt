package com.example.journal.data

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import androidx.room.Update
import kotlinx.coroutines.flow.Flow

@Dao
interface JournalDao {
    @Query("SELECT * FROM entries ORDER BY id DESC")
    fun observeAll(): Flow<List<JournalEntry>>

    @Query("SELECT * FROM entries WHERE id = :id")
    suspend fun getById(id: Int): JournalEntry?

    @Query("SELECT * FROM entries WHERE title LIKE :q OR content LIKE :q ORDER BY id DESC")
    fun search(q: String): Flow<List<JournalEntry>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun upsert(entry: JournalEntry): Long

    @Update
    suspend fun update(entry: JournalEntry)

    @Delete
    suspend fun delete(entry: JournalEntry)
}


