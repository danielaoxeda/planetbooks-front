'use client'

import { useState, useCallback, useMemo } from 'react'

// Validation rule types
export type ValidationRule<T> = {
    validate: (value: T) => boolean
    message: string
}

export type ValidationRules<T> = {
    [K in keyof T]?: ValidationRule<T[K]>[]
}