package com.awesomeproject

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class SsnTextElementPackage : ReactPackage {
    private var ssnTextElement: SsnTextElement? = null

    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        ssnTextElement = ssnTextElement ?: SsnTextElement(reactContext)
        return mutableListOf(ssnTextElement!!)
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        ssnTextElement = ssnTextElement ?: SsnTextElement(reactContext)
        val viewManagers: MutableList<ViewManager<*, *>> = ArrayList()
        ssnTextElement?.let { viewManagers.add(it) }

        return viewManagers
    }
}