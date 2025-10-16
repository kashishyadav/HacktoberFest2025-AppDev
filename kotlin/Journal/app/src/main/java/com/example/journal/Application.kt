package com.example.journal

import android.app.Application
import com.jakewharton.threetenabp.AndroidThreeTen

class JournalApp : Application() {
    override fun onCreate() {
        super.onCreate()
        AndroidThreeTen.init(this)
    }
}
