import {
  NO_ERRORS_SCHEMA,
  ViewContainerRef,
} from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { PaginationService } from 'ngx-pagination';
import { of } from 'rxjs';
import { ActivatedRouteStub } from 'src/app/shared/testing/active-router.stub';
import { PaginationServiceStub } from 'src/app/shared/testing/pagination-service.stub';

import { Bundle } from '../../../../core/shared/bundle.model';
import { Item } from '../../../../core/shared/item.model';
import { ResponsiveColumnSizes } from '../../../../shared/responsive-table-sizes/responsive-column-sizes';
import { ResponsiveTableSizes } from '../../../../shared/responsive-table-sizes/responsive-table-sizes';
import { ItemEditBitstreamBundleComponent } from './item-edit-bitstream-bundle.component';

describe('ItemEditBitstreamBundleComponent', () => {
  let comp: ItemEditBitstreamBundleComponent;
  let fixture: ComponentFixture<ItemEditBitstreamBundleComponent>;
  let viewContainerRef: ViewContainerRef;

  const columnSizes = new ResponsiveTableSizes([
    new ResponsiveColumnSizes(2, 2, 3, 4, 4),
    new ResponsiveColumnSizes(2, 3, 3, 3, 3),
    new ResponsiveColumnSizes(2, 2, 2, 2, 2),
    new ResponsiveColumnSizes(6, 5, 4, 3, 3),
  ]);

  const item = Object.assign(new Item(), {
    id: 'item-1',
    uuid: 'item-1',
  });
  const bundle = Object.assign(new Bundle(), {
    id: 'bundle-1',
    uuid: 'bundle-1',
    _links: {
      self: { href: 'bundle-1-selflink' },
    },
  });
  const mockStore = {
    select: () => of({}),
    dispatch: jasmine.createSpy('dispatch'),
  };


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), ItemEditBitstreamBundleComponent],
      providers: [
        { provide: ActivatedRoute, useValue: new ActivatedRouteStub() },
        { provide: PaginationService, useValue: new PaginationServiceStub() },
        { provide: Store, useValue: mockStore },
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemEditBitstreamBundleComponent);
    comp = fixture.componentInstance;
    comp.item = item;
    comp.bundle = bundle;
    comp.columnSizes = columnSizes;
    viewContainerRef = (comp as any).viewContainerRef;
    spyOn(viewContainerRef, 'createEmbeddedView');
    fixture.detectChanges();
  });

  it('should create an embedded view of the component', () => {
    expect(viewContainerRef.createEmbeddedView).toHaveBeenCalled();
  });
});
