package com.example.hydratrack

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.hydratrack.data.IntakeDataStore
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import java.time.LocalDate

data class IntakeUiState(
    val currentLiters: Double = 0.0,
    val goalLiters: Double = 5.0,
    val glassSize: Double = 0.25
)

class IntakeViewModel(private val dataStore: IntakeDataStore) : ViewModel() {

    private val internalLiters = MutableStateFlow(0.0)

    val uiState: StateFlow<IntakeUiState> = internalLiters
        .combine(MutableStateFlow(Unit)) { liters, _ ->
            IntakeUiState(currentLiters = liters)
        }
        .stateIn(viewModelScope, SharingStarted.Eagerly, IntakeUiState())

    init {
        viewModelScope.launch {
            dataStore.litersFlow.combine(dataStore.dateFlow) { liters, dateStr ->
                liters to dateStr
            }.collect { (liters, dateStr) ->
                val today = LocalDate.now().toString()
                if (dateStr.isEmpty()) {
                    dataStore.setDate(today)
                }
                if (dateStr != today) {
                    internalLiters.value = 0.0
                    dataStore.setLiters(0.0)
                    dataStore.setDate(today)
                } else {
                    internalLiters.value = liters
                }
            }
        }
    }

    fun increaseGlass() {
        viewModelScope.launch {
            val next = (internalLiters.value + GLASS_SIZE).coerceAtMost(GOAL_LITERS)
            internalLiters.value = next
            dataStore.setLiters(next)
        }
    }

    fun decreaseGlass() {
        viewModelScope.launch {
            val next = (internalLiters.value - GLASS_SIZE).coerceAtLeast(0.0)
            internalLiters.value = next
            dataStore.setLiters(next)
        }
    }

    companion object {
        const val GLASS_SIZE: Double = 0.25
        const val GOAL_LITERS: Double = 5.0
    }
}


