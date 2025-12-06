import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFilterComponent } from './product-filter.component';

describe('ProductFilterComponent', () => {
  let fixture: ComponentFixture<ProductFilterComponent>;
  let component: ProductFilterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFilterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show all products initially', () => {
    const items = fixture.nativeElement.querySelectorAll('li');
    expect(items.length).toBe(component.products.length);
  });

  it('should filter products by search term (case-insensitive, trimmed)', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.value = '  gel  ';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('li');
    expect(items.length).toBe(1);
    expect(items[0].textContent?.toLowerCase()).toContain('gel');
  });

  it('should show no-results message when nothing matches', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.value = 'zzzzz';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const noResults = fixture.nativeElement.querySelector('[data-testid="no-results"]');
    expect(noResults).toBeTruthy();
    expect(noResults.textContent).toContain('Aucun produit');
  });
});
