import React from 'react'

export async function FetchPermissions (token) {



    try {
            const response = await fetch('/user-permission/', {
                headers: {
                    'Authorization': `Bearer ${token}` // Assuming JWT
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch permissions');
            }
            const data = await response.json();
            return data.permissions;
        } catch (error) {
            console.error('Error fetching permissions:', error);
            return [];
        }

    }
