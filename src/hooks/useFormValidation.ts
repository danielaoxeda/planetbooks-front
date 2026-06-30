'use client'

import { useState, useCallback, useMemo } from 'react'

export type ValidationRule<T> = {
    validate: (value: T) => boolean
    message: string
}

export type ValidationRules<T> = {
    [K in keyof T]?: ValidationRule<T[K]>[]
}

export function useFormValidation<T extends object>(
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
            onChange: (
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setValue(name, e.target.value),
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
        setErrors,
        validateAll,
        handleBlur,
        reset,
        getFieldProps,
        isValid,
    }
}

export const ValidationPatterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
    url: /^https?:\/\/.+/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
}

export function createValidationRules() {
    return {
        required: (message = 'This field is required'): ValidationRule<string> => ({
            validate: (value) => Boolean(value && value.trim().length > 0),
            message,
        }),

        email: (message = 'Please enter a valid email address'): ValidationRule<string> => ({
            validate: (value) => !value || ValidationPatterns.email.test(value),
            message,
        }),

        minLength: (min: number, message?: string): ValidationRule<string> => ({
            validate: (value) => !value || value.length >= min,
            message: message || `Must be at least ${min} characters`,
        }),

        maxLength: (max: number, message?: string): ValidationRule<string> => ({
            validate: (value) => !value || value.length <= max,
            message: message || `Must be no more than ${max} characters`,
        }),

        password: (
            message = 'Password must contain uppercase, lowercase, and a number'
        ): ValidationRule<string> => ({
            validate: (value) => !value || ValidationPatterns.password.test(value),
            message,
        }),

        passwordMinLength: (min: number, message?: string): ValidationRule<string> => ({
            validate: (value) => !value || value.length >= min,
            message: message || `Password must be at least ${min} characters`,
        }),

        match: (matchValue: string, message = 'Fields do not match'): ValidationRule<string> => ({
            validate: (value) => value === matchValue,
            message,
        }),

        pattern: (regex: RegExp, message = 'Invalid format'): ValidationRule<string> => ({
            validate: (value) => !value || regex.test(value),
            message,
        }),
    }
}
