import { TestBed } from '@angular/core/testing';
import { HubBadgeGroupComponent } from './badge-group.component';

describe('HubBadgeGroupComponent', () => {
	it('reflects layout inputs through data attributes and CSS custom properties', async () => {
		const fixture = await TestBed.configureTestingModule({
			imports: [HubBadgeGroupComponent]
		}).createComponent(HubBadgeGroupComponent);

		fixture.componentRef.setInput('direction', 'column');
		fixture.componentRef.setInput('align', 'start');
		fixture.componentRef.setInput('gap', '1rem');
		fixture.componentRef.setInput('wrap', false);
		fixture.detectChanges();

		const host: HTMLElement = fixture.nativeElement;

		expect(host.getAttribute('data-direction')).toBe('column');
		expect(host.getAttribute('data-nowrap')).toBe('true');
		expect(host.style.getPropertyValue('--hub-badge-group-gap')).toBe('1rem');
		expect(host.style.getPropertyValue('--hub-badge-group-align')).toBe('flex-start');
	});
});
