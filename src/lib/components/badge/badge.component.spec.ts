import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HubBadgeComponent } from './badge.component';

@Component({
	standalone: true,
	imports: [HubBadgeComponent],
	template: `
		<hub-badge [variant]="variant" [color]="color" [size]="size" [shape]="shape" [dot]="dot" [removable]="removable" [disabled]="disabled" [removeLabel]="removeLabel" (removed)="handleRemoved()">
			{{ label }}
		</hub-badge>
	`
})
class HostBadgeComponent {
	variant = 'soft' as const;
	color = 'success';
	size = 'lg' as const;
	shape = 'rounded' as const;
	dot = true;
	removable = false;
	disabled = false;
	removeLabel = 'Dismiss label';
	label = 'Live';
	removedCount = 0;

	handleRemoved(): void {
		this.removedCount += 1;
	}
}

describe('HubBadgeComponent', () => {
	it('applies the configured variant, size, shape and semantic data attribute', async () => {
		const fixture = await TestBed.configureTestingModule({
			imports: [HostBadgeComponent]
		}).createComponent(HostBadgeComponent);

		fixture.detectChanges();

		const badge: HTMLElement = fixture.nativeElement.querySelector('hub-badge');

		expect(badge.className).toContain('hub-badge--soft');
		expect(badge.className).toContain('hub-badge--lg');
		expect(badge.className).toContain('hub-badge--rounded');
		expect(badge.className).toContain('hub-badge--dot');
		expect(badge.getAttribute('data-variant')).toBe('success');
		expect(badge.style.getPropertyValue('--hub-badge-accent')).toBe('var(--hub-sys-color-success, var(--hub-sys-color-primary, #0d6efd))');
	});

	it('renders the dismiss button and emits removed when activated', async () => {
		const fixture = await TestBed.configureTestingModule({
			imports: [HostBadgeComponent]
		}).createComponent(HostBadgeComponent);

		fixture.componentInstance.removable = true;
		fixture.detectChanges();

		const removeButton = fixture.debugElement.query(By.css('.hub-badge__remove'));
		expect(removeButton.attributes['aria-label']).toBe('Dismiss label');

		removeButton.nativeElement.click();
		fixture.detectChanges();

		expect(fixture.componentInstance.removedCount).toBe(1);
	});

	it('does not emit removed when the dismiss action is disabled', async () => {
		const fixture = await TestBed.configureTestingModule({
			imports: [HostBadgeComponent]
		}).createComponent(HostBadgeComponent);

		fixture.componentInstance.removable = true;
		fixture.componentInstance.disabled = true;
		fixture.detectChanges();

		const removeButton = fixture.debugElement.query(By.css('.hub-badge__remove'));
		removeButton.nativeElement.click();
		fixture.detectChanges();

		expect(fixture.componentInstance.removedCount).toBe(0);
	});
});
