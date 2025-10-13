package com.example.hydratrack.ui

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.size
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.unit.dp

@Composable
fun GlassIllustration(progressRatio: Float, modifier: Modifier = Modifier) {
    val animatedProgress by animateFloatAsState(targetValue = progressRatio.coerceIn(0f, 1f), label = "fill")

    Canvas(modifier = modifier.size(220.dp)) {
        val width = size.width
        val height = size.height

        // Define glass trapezoid
        val bottomWidth = width * 0.45f
        val topWidth = width * 0.75f
        val bottomY = height * 0.75f
        val topY = height * 0.2f
        val leftXBottom = (width - bottomWidth) / 2f
        val rightXBottom = width - leftXBottom
        val leftXTop = (width - topWidth) / 2f
        val rightXTop = width - leftXTop

        val outline = Path().apply {
            moveTo(leftXTop, topY)
            lineTo(leftXBottom, bottomY)
            lineTo(rightXBottom, bottomY)
            lineTo(rightXTop, topY)
        }

        val maxFillHeight = bottomY - topY
        val fillHeight = animatedProgress * maxFillHeight
        val fillTopY = bottomY - fillHeight

        fun lerp(a: Float, b: Float, t: Float): Float = a + (b - a) * t
        val tY = ((fillTopY - topY) / (bottomY - topY)).coerceIn(0f, 1f)
        val leftXAtFill = lerp(leftXTop, leftXBottom, tY)
        val rightXAtFill = lerp(rightXTop, rightXBottom, tY)

        val waterPath = Path().apply {
            moveTo(leftXBottom + 2f, bottomY - 2f)
            lineTo(rightXBottom - 2f, bottomY - 2f)
            lineTo(rightXAtFill - 2f, fillTopY)
            lineTo(leftXAtFill + 2f, fillTopY)
            close()
        }
        drawPath(path = waterPath, color = Color(0xFF4FC3F7))

        drawPath(
            path = outline,
            color = Color.Black,
            style = Stroke(width = 4f, cap = StrokeCap.Round)
        )
        drawLine(
            color = Color.Black,
            start = Offset(leftXBottom, bottomY),
            end = Offset(rightXBottom, bottomY),
            strokeWidth = 4f,
            cap = StrokeCap.Round
        )
    }
}


