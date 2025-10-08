package com.example.journal.ui.richtext

import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextDecoration

/**
 * Very small markdown-like parser supporting:
 * - **bold**
 * - _italic_
 * - ~underline~
 */
fun parseSimpleMarkdown(source: String): AnnotatedString {
    if (source.isEmpty()) return AnnotatedString("")

    data class Marker(val token: String, val style: SpanStyle)

    val markers = listOf(
        Marker("**", SpanStyle(fontWeight = FontWeight.Bold)),
        Marker("_", SpanStyle(fontStyle = FontStyle.Italic)),
        Marker("~", SpanStyle(textDecoration = TextDecoration.Underline))
    )

    val ranges = mutableListOf<Triple<Int, Int, SpanStyle>>()
    val tokenStack = ArrayDeque<Pair<Marker, Int>>()

    val out = StringBuilder()
    var i = 0
    while (i < source.length) {
        var matched: Marker? = null
        var matchedLen = 0
        for (m in markers) {
            if (source.startsWith(m.token, i)) {
                matched = m
                matchedLen = m.token.length
                break
            }
        }
        if (matched != null) {
            val top = tokenStack.lastOrNull()
            if (top != null && top.first.token == matched.token) {
                val startPos = top.second
                val endPos = out.length
                if (endPos > startPos) ranges += Triple(startPos, endPos, matched.style)
                tokenStack.removeLast()
            } else {
                tokenStack.addLast(matched to out.length)
            }
            i += matchedLen
        } else {
            out.append(source[i])
            i++
        }
    }

    return buildAnnotatedString {
        append(out.toString())
        for ((start, end, style) in ranges) {
            addStyle(style, start, end)
        }
    }
}


