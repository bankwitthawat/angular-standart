/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'menu',
        title: 'Menu',
        type: 'group',
        children: [
            {
                id: 'sub',
                title: 'sub',
                type: 'collapsable',
                icon: 'heroicons_outline:chart-pie',
                children: [
                    {
                        id: 'home',
                        title: 'Home',
                        type: 'basic',
                        icon: 'heroicons_outline:home',
                        link: '/home'
                    },
                    {
                        id: 'example',
                        title: 'App User',
                        type: 'basic',
                        icon: 'heroicons_outline:clipboard-list',
                        link: '/app-user'
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
