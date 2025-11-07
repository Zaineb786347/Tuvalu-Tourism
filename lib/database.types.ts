export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'user' | 'provider' | 'admin'
          phone: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: 'user' | 'provider' | 'admin'
          phone?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: 'user' | 'provider' | 'admin'
          phone?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          icon: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          icon?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          icon?: string | null
          created_at?: string
        }
      }
      listings: {
        Row: {
          id: string
          provider_id: string
          category_id: string
          title: string
          slug: string
          description: string
          short_description: string | null
          price: number
          currency: string
          location: string
          latitude: number | null
          longitude: number | null
          max_capacity: number
          images: string[]
          amenities: string[]
          is_active: boolean
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          provider_id: string
          category_id: string
          title: string
          slug: string
          description: string
          short_description?: string | null
          price: number
          currency?: string
          location: string
          latitude?: number | null
          longitude?: number | null
          max_capacity?: number
          images?: string[]
          amenities?: string[]
          is_active?: boolean
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          provider_id?: string
          category_id?: string
          title?: string
          slug?: string
          description?: string
          short_description?: string | null
          price?: number
          currency?: string
          location?: string
          latitude?: number | null
          longitude?: number | null
          max_capacity?: number
          images?: string[]
          amenities?: string[]
          is_active?: boolean
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          listing_id: string
          user_id: string
          start_date: string
          end_date: string
          guests: number
          total_price: number
          currency: string
          status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          payment_status: 'pending' | 'paid' | 'refunded'
          payment_method: 'stripe' | 'local'
          special_requests: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          listing_id: string
          user_id: string
          start_date: string
          end_date: string
          guests: number
          total_price: number
          currency?: string
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          payment_status?: 'pending' | 'paid' | 'refunded'
          payment_method?: 'stripe' | 'local'
          special_requests?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          listing_id?: string
          user_id?: string
          start_date?: string
          end_date?: string
          guests?: number
          total_price?: number
          currency?: string
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          payment_status?: 'pending' | 'paid' | 'refunded'
          payment_method?: 'stripe' | 'local'
          special_requests?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          booking_id: string
          amount: number
          currency: string
          payment_method: 'stripe' | 'local'
          stripe_payment_intent_id: string | null
          status: 'pending' | 'succeeded' | 'failed' | 'refunded'
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          booking_id: string
          amount: number
          currency?: string
          payment_method: 'stripe' | 'local'
          stripe_payment_intent_id?: string | null
          status?: 'pending' | 'succeeded' | 'failed' | 'refunded'
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          booking_id?: string
          amount?: number
          currency?: string
          payment_method?: 'stripe' | 'local'
          stripe_payment_intent_id?: string | null
          status?: 'pending' | 'succeeded' | 'failed' | 'refunded'
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          listing_id: string
          user_id: string
          booking_id: string | null
          rating: number
          comment: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          listing_id: string
          user_id: string
          booking_id?: string | null
          rating: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          listing_id?: string
          user_id?: string
          booking_id?: string | null
          rating?: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
