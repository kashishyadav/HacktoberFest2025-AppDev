package com.example.journal

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.ui.Modifier
import com.example.journal.ui.theme.JournalTheme
import com.example.journal.data.JournalDatabase
import com.example.journal.data.JournalRepository
import com.example.journal.ui.navigation.JournalNavHost
import com.example.journal.ui.navigation.rememberJournalNavController

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            JournalTheme {
                val navController = rememberJournalNavController()
                val db = JournalDatabase.get(this)
                val repo = JournalRepository(db.journalDao())
                JournalNavHost(navController = navController, repository = repo, modifier = Modifier.fillMaxSize())
            }
        }
    }
}