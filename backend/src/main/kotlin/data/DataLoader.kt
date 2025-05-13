package com.example.data

import com.example.models.Battery
import com.example.models.Temperature
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import java.io.File

@Serializable
data class DataWrapper(
    val battery: List<Battery>,
    val temperature: List<Temperature>
)

object DataLoader {
    val data: DataWrapper by lazy {
        val json = File("data.json").readText()
        Json.decodeFromString<DataWrapper>(json)
    }
}
