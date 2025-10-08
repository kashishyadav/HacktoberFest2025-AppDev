package com.example.pomodoro.ui

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

enum class TimerMode { Idle, Work, Break }

data class TimerState(
    val mode: TimerMode = TimerMode.Idle,
    val isRunning: Boolean = false,
    val workMinutes: Int = 25,
    val breakMinutes: Int = 5,
    val remainingSeconds: Int = 25 * 60
)

class PomodoroViewModel : ViewModel() {
    private val _uiState = MutableStateFlow(TimerState())
    val uiState: StateFlow<TimerState> = _uiState

    private var ticker: Job? = null

    fun startTimer() {
        if (_uiState.value.isRunning) return
        if (_uiState.value.mode == TimerMode.Idle) {
            _uiState.value = _uiState.value.copy(
                mode = TimerMode.Work,
                remainingSeconds = _uiState.value.workMinutes * 60
            )
        }
        _uiState.value = _uiState.value.copy(isRunning = true)
        startTicking()
    }

    fun pauseTimer() {
        _uiState.value = _uiState.value.copy(isRunning = false)
        ticker?.cancel()
    }

    fun resetTimer() {
        ticker?.cancel()
        _uiState.value = _uiState.value.copy(
            mode = TimerMode.Idle,
            isRunning = false,
            remainingSeconds = _uiState.value.workMinutes * 60
        )
    }

    fun setWorkMinutes(minutes: Int) {
        val clamped = minutes.coerceIn(1, 180)
        _uiState.value = _uiState.value.copy(workMinutes = clamped)
        if (_uiState.value.mode == TimerMode.Idle) {
            _uiState.value = _uiState.value.copy(remainingSeconds = clamped * 60)
        }
    }

    fun setBreakMinutes(minutes: Int) {
        val clamped = minutes.coerceIn(1, 60)
        _uiState.value = _uiState.value.copy(breakMinutes = clamped)
    }

    private fun startTicking() {
        ticker?.cancel()
        ticker = viewModelScope.launch {
            while (true) {
                if (!_uiState.value.isRunning) break
                delay(1000)
                val current = _uiState.value
                if (!current.isRunning) continue
                if (current.remainingSeconds > 0) {
                    _uiState.value = current.copy(remainingSeconds = current.remainingSeconds - 1)
                } else {
                    // Switch mode and continue ticking within the same job
                    val (nextMode, nextSeconds) = when (current.mode) {
                        TimerMode.Work, TimerMode.Idle -> TimerMode.Break to (current.breakMinutes * 60)
                        TimerMode.Break -> TimerMode.Work to (current.workMinutes * 60)
                    }
                    _uiState.value = current.copy(mode = nextMode, remainingSeconds = nextSeconds, isRunning = true)
                }
            }
        }
    }
}


