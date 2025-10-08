package com.example.pomodoro.ui

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Pause
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun PomodoroScreen(viewModel: PomodoroViewModel) {
    val state by viewModel.uiState.collectAsState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(horizontal = 24.dp, vertical = 16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text(
            text = "Pomodoro",
            fontSize = 20.sp,
            fontWeight = FontWeight.Bold,
            textAlign = TextAlign.Center,
            modifier = Modifier.padding(top = 0.dp)
        )

        Spacer(modifier = Modifier.height(16.dp))
        val isFocus = when (state.mode) {
            TimerMode.Work, TimerMode.Idle -> true
            TimerMode.Break -> false
        }
        val modeLabel = if (isFocus) "FOCUS" else "BREAK"
        Text(
            text = modeLabel,
            fontSize = 40.sp,
            fontWeight = FontWeight.Bold,
            color = Color.DarkGray,
            modifier = Modifier.padding(bottom = 8.dp)
        )
        CircularTimer(
            seconds = state.remainingSeconds,
            totalSeconds = when (state.mode) {
                TimerMode.Work, TimerMode.Idle -> state.workMinutes * 60
                TimerMode.Break -> state.breakMinutes * 60
            },
            size = 220.dp,
            borderWidth = 2.dp,
            backgroundColor = if (isFocus) Color(0xFFDFF3FF) else Color(0xFFDFFFE5)
        )

        Spacer(modifier = Modifier.height(16.dp))

        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            IconButton(onClick = {
                if (state.isRunning) viewModel.pauseTimer() else viewModel.startTimer()
            }) {
                Icon(
                    imageVector = if (state.isRunning) Icons.Filled.Pause else Icons.Filled.PlayArrow,
                    contentDescription = null
                )
            }
            IconButton(onClick = { viewModel.resetTimer() }) {
                Icon(imageVector = Icons.Filled.Refresh, contentDescription = null)
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        LabeledNumberField(
            label = "Work Time:",
            valueMinutes = state.workMinutes,
            onValueChange = { minutes -> viewModel.setWorkMinutes(minutes) },
            width = 80.dp
        )

        Spacer(modifier = Modifier.height(8.dp))

        LabeledNumberField(
            label = "Break Time:",
            valueMinutes = state.breakMinutes,
            onValueChange = { minutes -> viewModel.setBreakMinutes(minutes) },
            width = 80.dp
        )
    }
}

@Composable
private fun CircularTimer(
    seconds: Int,
    totalSeconds: Int,
    size: Dp,
    borderWidth: Dp,
    backgroundColor: Color
) {
    val minutesPart = seconds / 60
    val secondsPart = seconds % 60
    val timeText = String.format("%02d:%02d", minutesPart, secondsPart)

    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Box(
            contentAlignment = Alignment.Center,
            modifier = Modifier
                .size(size)
                .clip(CircleShape)
                .background(backgroundColor)
                .border(BorderStroke(borderWidth, Color.Black), CircleShape)
        ) {
            Canvas(modifier = Modifier.fillMaxSize()) {
                val sweep = if (totalSeconds > 0) (seconds.toFloat() / totalSeconds.toFloat()) * 360f else 0f
                val stroke = Stroke(width = borderWidth.toPx() * 2, cap = StrokeCap.Round)
                val pad = stroke.width / 2
                drawArc(
                    color = Color.Black,
                    startAngle = -90f,
                    sweepAngle = sweep,
                    useCenter = false,
                    style = stroke,
                    topLeft = Offset(pad, pad),
                    size = Size(this.size.width - stroke.width, this.size.height - stroke.width)
                )
            }
            Text(
                text = timeText,
                fontSize = 32.sp,
                fontWeight = FontWeight.Medium
            )
        }
    }
}

@Composable
private fun LabeledNumberField(
    label: String,
    valueMinutes: Int,
    onValueChange: (Int) -> Unit,
    width: Dp
) {
    Row(
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.Start
    ) {
        Text(
            text = label,
            fontSize = 16.sp,
            fontWeight = FontWeight.Bold,
            modifier = Modifier.padding(end = 8.dp)
        )
        OutlinedTextField(
            value = valueMinutes.toString(),
            onValueChange = { input ->
                val number = input.takeWhile { it.isDigit() }
                if (number.isNotEmpty()) {
                    onValueChange(number.toInt())
                }
            },
            singleLine = true,
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
            modifier = Modifier.width(width)
        )
        Spacer(modifier = Modifier.width(8.dp))
        Text(text = "min", fontSize = 14.sp, color = Color.Gray)
    }
}


