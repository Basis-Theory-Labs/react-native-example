package com.awesomeproject

import android.graphics.Color
import android.os.Build
import androidx.annotation.RequiresApi
import androidx.appcompat.content.res.AppCompatResources
import com.basistheory.android.model.KeyboardType
import com.basistheory.android.service.BasisTheoryElements
import com.basistheory.android.view.TextElement
import com.basistheory.android.view.mask.ElementMask
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.google.gson.GsonBuilder
import kotlinx.coroutines.*

class SsnTextElement(context: ReactApplicationContext) :
    SimpleViewManager<TextElement?>() {
    private val apiKey = "key_7jc18XCxYYozHbepjpWHqU"
    private val bt = BasisTheoryElements.builder().apiKey(apiKey).build()
    private val coroutineScope = CoroutineScope(SupervisorJob() + Dispatchers.Main.immediate)
    private lateinit var ssnTextElement: TextElement

    override fun createViewInstance(context: ThemedReactContext): TextElement {
        ssnTextElement = TextElement(context)
        ssnTextElement.setPadding(10, 10, 10, 10)
        ssnTextElement.hint = "Enter SSN"
        ssnTextElement.keyboardType = KeyboardType.NUMBER
        ssnTextElement.mask = ElementMask("###-##-####")
        ssnTextElement.background =
            AppCompatResources.getDrawable(context, R.drawable.rounded_edit_text)
        ssnTextElement.textColor = Color.BLACK

        ssnTextElement.addChangeEventListener {
            println(it)
        }

        return ssnTextElement
    }

    @RequiresApi(Build.VERSION_CODES.O)
    @ReactMethod
    fun tokenize(promise: Promise) {
        coroutineScope.launch {
            try {
                val body =  ssnTextElement

                val response = withContext(context = Dispatchers.IO) {
                    bt.tokenize(body)
                }

                val gson = GsonBuilder().setPrettyPrinting().create()
                val prettyPrintedJson = gson.toJson(response)

                promise.resolve(prettyPrintedJson)
            } catch (e: Exception) {
                promise.reject("Tokenizing error", e)
            }
        }
    }

    override fun getName(): String {
        return "SsnTextElement"
    }
}
