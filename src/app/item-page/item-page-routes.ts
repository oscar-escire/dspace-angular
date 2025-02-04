import { Route } from '@angular/router';

import { REQUEST_COPY_MODULE_PATH } from '../app-routing-paths';
import { authenticatedGuard } from '../core/auth/authenticated.guard';
import { itemBreadcrumbResolver } from '../core/breadcrumbs/item-breadcrumb.resolver';
import { dsoEditMenuResolver } from '../shared/dso-page/dso-edit-menu.resolver';
import { LinkMenuItemModel } from '../shared/menu/menu-item/models/link.model';
import { MenuItemType } from '../shared/menu/menu-item-type.model';
import { BitstreamRequestACopyPageComponent } from './bitstreams/request-a-copy/bitstream-request-a-copy-page.component';
import { UploadBitstreamComponent } from './bitstreams/upload/upload-bitstream.component';
import { ThemedFullItemPageComponent } from './full/themed-full-item-page.component';
import { itemPageResolver } from './item-page.resolver';
import {
  ITEM_EDIT_PATH,
  ORCID_PATH,
  UPLOAD_BITSTREAM_PATH,
} from './item-page-routing-paths';
import { OrcidPageComponent } from './orcid-page/orcid-page.component';
import { orcidPageGuard } from './orcid-page/orcid-page.guard';
import { ThemedItemPageComponent } from './simple/themed-item-page.component';
import { versionResolver } from './version-page/version.resolver';
import { VersionPageComponent } from './version-page/version-page/version-page.component';

export const ROUTES: Route[] = [
  {
    path: ':id',
    resolve: {
      dso: itemPageResolver,
      breadcrumb: itemBreadcrumbResolver,
    },
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: '',
        component: ThemedItemPageComponent,
        pathMatch: 'full',
        resolve: {
          menu: dsoEditMenuResolver,
        },
      },
      {
        path: 'full',
        component: ThemedFullItemPageComponent,
        resolve: {
          menu: dsoEditMenuResolver,
        },
      },
      {
        path: ITEM_EDIT_PATH,
        loadChildren: () => import('./edit-item-page/edit-item-page-routes')
          .then((m) => m.ROUTES),
      },
      {
        path: UPLOAD_BITSTREAM_PATH,
        component: UploadBitstreamComponent,
        canActivate: [authenticatedGuard],
      },
      {
        path: REQUEST_COPY_MODULE_PATH,
        component: BitstreamRequestACopyPageComponent,
      },
      {
        path: ORCID_PATH,
        component: OrcidPageComponent,
        canActivate: [authenticatedGuard, orcidPageGuard],
      },
    ],
    data: {
      menu: {
        public: [
          {
            id: 'statistics',
            active: true,
            visible: true,
            index: 2,
            model: {
              type: MenuItemType.TEXT,
              text: 'menu.section.statistics',
            } as LinkMenuItemModel,
          },
          {
            id: 'statistics_site',
            parentID: 'statistics',
            active: false,
            visible: true,
            model: {
              type: MenuItemType.LINK,
              text: 'menu.section.statistics.site',
              link: 'statistics',
            } as LinkMenuItemModel,
          },
          {
            id: 'statistics_community_:id',
            parentID: 'statistics',
            active: false,
            visible: true,
            model: {
              type: MenuItemType.LINK,
              text: 'menu.section.statistics.community',
              link: 'statistics/communities/:id/',
            } as LinkMenuItemModel,
          },
          {
            id: 'statistics_collection_:id',
            parentID: 'statistics',
            active: false,
            visible: true,
            model: {
              type: MenuItemType.LINK,
              text: 'menu.section.statistics.collection',
              link: 'statistics/collections/:id/',
            } as LinkMenuItemModel,
          },
          {
            id: 'statistics_item_:id',
            parentID: 'statistics',
            active: false,
            visible: true,
            model: {
              type: MenuItemType.LINK,
              text: 'menu.section.statistics.item',
              link: 'statistics/items/:id/',
            } as LinkMenuItemModel,
          },
        ],
      },
    },
  },
  {
    path: 'version',
    children: [
      {
        path: ':id',
        component: VersionPageComponent,
        resolve: {
          dso: versionResolver,
        },
      },
    ],
  },
];
