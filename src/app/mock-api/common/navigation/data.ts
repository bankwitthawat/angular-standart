/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'menu',
        title: 'Menu',
        type: 'group',
        children: [
            {
                id: 'home',
                title: 'Home',
                type: 'collapsable',
                icon: 'heroicons_outline:home',
                children: [
                    {
                        id: 'home',
                        title: 'Home',
                        type: 'basic',
                        icon: 'heroicons_outline:home',
                        link: '/home'
                    }
                ]
            },
            {
                id: 'user',
                title: 'Authentication',
                type: 'collapsable',
                icon: 'heroicons_outline:users',
                children: [
                    {
                        id: 'user-role',
                        title: 'User Role',
                        type: 'basic',
                        icon: 'heroicons_outline:user',
                        link: '/user-role'
                    },
                    {
                        id: 'application',
                        title: 'App User',
                        type: 'basic',
                        icon: 'heroicons_outline:user',
                        link: '/app-user'
                    }
                ]
            },
            {
                id: 'setting',
                title: 'Setting',
                type: 'collapsable',
                icon: 'heroicons_outline:cog',
                children: [
                    {
                        id: 'profile',
                        title: 'Profile',
                        type: 'basic',
                        icon: 'heroicons_outline:user',
                        link: '/profile'
                    }
                ]
            }
        ]
    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
