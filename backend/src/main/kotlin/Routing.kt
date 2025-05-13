package com.example

import com.example.data.DataLoader
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    routing {
        get("/") {
            call.respondText("Hello World!")
        }
        get("/battery") {
            call.respond(DataLoader.data.battery)
        }
        get("/temperature") {
            call.respond(DataLoader.data.temperature)
        }
    }
}
