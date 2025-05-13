package com.example.models
import kotlinx.serialization.Serializable

@Serializable
data class Battery(
    val timestamp: Long,
    val rem_cap: Int? = null,
    val inst_curr: Int? = null,
    val voltage: Int? = null,
    val battery_level: Int? = null,
    val battery_status: Int? = null,
    val plug_type: Int? = null
)

@Serializable
data class Temperature(
    val timestamp: Long,
    val temp_bat: Int? = null,
    val temp_front: Int? = null,
    val temp_back: Int? = null,
    val temp_cpu: Int? = null
)
