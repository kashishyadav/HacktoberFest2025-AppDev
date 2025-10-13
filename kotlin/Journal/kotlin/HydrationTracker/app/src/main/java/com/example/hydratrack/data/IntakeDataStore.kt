package com.example.hydratrack.data

import android.content.Context
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.doublePreferencesKey
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

private const val DATASTORE_NAME = "hydration_prefs"

private val Context.dataStore by preferencesDataStore(name = DATASTORE_NAME)

class IntakeDataStore(private val context: Context) {

    private object Keys {
        val liters: Preferences.Key<Double> = doublePreferencesKey("current_liters")
        val date: Preferences.Key<String> = stringPreferencesKey("current_date")
    }

    val litersFlow: Flow<Double> = context.dataStore.data.map { prefs ->
        prefs[Keys.liters] ?: 0.0
    }

    val dateFlow: Flow<String> = context.dataStore.data.map { prefs ->
        prefs[Keys.date] ?: ""
    }

    suspend fun setLiters(value: Double) {
        context.dataStore.edit { prefs ->
            prefs[Keys.liters] = value
        }
    }

    suspend fun setDate(value: String) {
        context.dataStore.edit { prefs ->
            prefs[Keys.date] = value
        }
    }
}


