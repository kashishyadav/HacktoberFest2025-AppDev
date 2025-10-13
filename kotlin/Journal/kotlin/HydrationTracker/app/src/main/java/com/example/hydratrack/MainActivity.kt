package com.example.hydratrack

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
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
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.hydratrack.data.IntakeDataStore
import com.example.hydratrack.ui.GlassIllustration
import com.example.hydratrack.ui.theme.HydrationTrackerTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        val dataStore = IntakeDataStore(this)
        setContent {
            HydrationTrackerTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    val vm: IntakeViewModel = viewModel(factory = object : ViewModelProvider.Factory {
                        override fun <T : ViewModel> create(modelClass: Class<T>): T {
                            @Suppress("UNCHECKED_CAST")
                            return IntakeViewModel(dataStore) as T
                        }
                    })
                    HydrationScreen(vm, Modifier.padding(innerPadding))
                }
            }
        }
    }
}

@Composable
fun HydrationScreen(vm: IntakeViewModel, modifier: Modifier = Modifier) {
    val state by vm.uiState.collectAsState()
    val progress = (state.currentLiters / IntakeViewModel.GOAL_LITERS).toFloat()
    val glasses = (state.currentLiters / IntakeViewModel.GLASS_SIZE).toInt()

    Column(
        modifier = modifier.fillMaxSize(),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        GlassIllustration(progressRatio = progress)
        Spacer(Modifier.height(8.dp))
        Text(text = "$glasses", fontSize = 36.sp, fontWeight = FontWeight.Bold)
        Spacer(Modifier.height(16.dp))
        Row(verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.Center) {
            OutlinedButton(onClick = { vm.decreaseGlass() }, shape = CircleShape, modifier = Modifier.size(56.dp)) {
                Text("−", fontSize = 24.sp)
            }
            Spacer(Modifier.width(12.dp))
            Text("Glass size: 250ml", fontSize = 16.sp)
            Spacer(Modifier.width(12.dp))
            OutlinedButton(onClick = { vm.increaseGlass() }, shape = CircleShape, modifier = Modifier.size(56.dp)) {
                Text("+", fontSize = 24.sp)
            }
        }
        Spacer(Modifier.height(20.dp))
        Row(modifier = Modifier
            .width(260.dp)
            .height(10.dp)
            .clip(RoundedCornerShape(8.dp))
            .background(Color(0xFFE0E0E0))) {
            Row(
                modifier = Modifier
                    .height(10.dp)
                    .width((260 * progress).dp)
                    .background(Color(0xFF4FC3F7))
            ) {}
        }
        Spacer(Modifier.height(16.dp))
        val cardColor = if (progress > 0f) Color(0x334FC3F7) else Color(0x33000000)
        Card(colors = CardDefaults.cardColors(containerColor = cardColor), shape = RoundedCornerShape(12.dp)) {
            Text(
                text = "Daily Goal: ${"%.2f".format(state.currentLiters)} L / ${IntakeViewModel.GOAL_LITERS} L",
                modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp),
                style = MaterialTheme.typography.bodyMedium
            )
        }
    }
}
