'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function RegisterPage() {
  const searchParams = useSearchParams()
  const defaultType = searchParams.get('type') || 'user'
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState<'user' | 'provider'>(defaultType as any)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Sign up user with metadata
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
            phone: phone,
          }
        }
      })

      if (authError) throw authError

      // Update profile with additional info (trigger creates basic profile)
      if (authData.user) {
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            full_name: fullName,
            phone: phone,
            role: role,
          })
          .eq('id', authData.user.id)

        if (updateError) {
          console.error('Profile update error:', updateError)
          // Don't throw - profile was created by trigger, update is optional
        }
      }

      // Redirect based on role
      if (role === 'provider') {
        router.push('/provider/dashboard')
      } else {
        router.push('/listings')
      }
    } catch (error: any) {
      setError(error.message || 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-medium text-primary-600 hover:text-primary-500">
              Sign in
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="label">Account Type</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole('user')}
                  className={`py-3 px-4 rounded-lg border-2 transition ${
                    role === 'user'
                      ? 'border-primary-600 bg-primary-50 text-primary-600'
                      : 'border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="text-2xl mb-1">👤</div>
                  <div className="font-semibold">Tourist</div>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('provider')}
                  className={`py-3 px-4 rounded-lg border-2 transition ${
                    role === 'provider'
                      ? 'border-primary-600 bg-primary-50 text-primary-600'
                      : 'border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="text-2xl mb-1">🏠</div>
                  <div className="font-semibold">Provider</div>
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="fullName" className="label">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                className="input-field"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="email" className="label">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="phone" className="label">
                Phone Number (optional)
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="input-field"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={6}
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="mt-1 text-sm text-gray-500">Minimum 6 characters</p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
