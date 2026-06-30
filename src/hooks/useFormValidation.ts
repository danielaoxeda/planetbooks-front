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

// Form validation hook
export function useFormValidation<T extends Record<string, unknown>>(
    initialValues: T,
    validationRules: ValidationRules<T>
) {
    const [values, setValues] = useState<T>(initialValues)
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
    const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({})

    const validateField = useCallback(
        (name: keyof T, value: unknown) => {
            const rules = validationRules[name]
            if (!rules) return null

            for (const rule of rules) {
                if (!rule.validate(value as T[keyof T])) {
                    return rule.message
                }
            }
            return null
        },
        [validationRules]
    )

    const validateAll = useCallback(() => {
        const newErrors: Partial<Record<keyof T, string>> = {}
        let isValid = true

        for (const key of Object.keys(values) as (keyof T)[]) {
            const error = validateField(key, values[key])
            if (error) {
                newErrors[key] = error
                isValid = false
            }
        }

        setErrors(newErrors)
        return isValid
    }, [values, validateField])

    const setValue = useCallback(
        (name: keyof T, value: unknown) => {
            setValues((prev) => ({ ...prev, [name]: value }))

            // Clear error when user starts typing
            if (errors[name]) {
                setErrors((prev) => {
                    const newErrors = { ...prev }
                    delete newErrors[name]
                    return newErrors
                })
            }
        },
        [errors]
    )

    const handleBlur = useCallback(
        (name: keyof T) => {
            setTouched((prev) => ({ ...prev, [name]: true }))

            const error = validateField(name, values[name])
            setErrors((prev) => ({
                ...prev,
                [name]: error || undefined,
            }))
        },
        [validateField, values]
    )

    const reset = useCallback(
        (newValues?: T) => {
            setValues(newValues || initialValues)
            setErrors({})
            setTouched({})
        },
        [initialValues]
    )

    const getFieldProps = useCallback(
        (name: keyof T) => ({
            value: values[name] ?? '',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(name, e.target.value),
            onBlur: () => handleBlur(name),
            error: touched[name] ? errors[name] : undefined,
        }),
        [values, setValue, handleBlur, errors, touched]
    )

    const isValid = useMemo(() => {
        return Object.keys(errors).length === 0 && Object.keys(touched).length > 0
    }, [errors, touched])

    return {
        values,
        errors,
        touched,
        setValue,
        setValues,
        validateAll,
        handleBlur,
        reset,
        getFieldProps,
        isValid,
    }
}