/**
 * External dependencies
 */
import React from 'react';
import { get } from 'lodash';
import page from 'page';

/**
 * Internal Dependencies
 */
import CustomerHome from './main';
import { getSelectedSiteSlug, getSelectedSiteId } from 'state/ui/selectors';
import { canCurrentUserUseCustomerHome, getSitePlan } from 'state/sites/selectors';
import isRecentlyMigratedSite from 'state/selectors/is-site-recently-migrated';
import reducer from 'state/concierge/reducer';

export default async function ( context, next ) {
	const state = await context.store.getState();
	const siteId = await getSelectedSiteId( state );
	const plan = await getSitePlan( state, siteId );

	if ( ! plan.is_free && [ 'Business', 'eCommerce' ].includes( plan.product_name_short ) ) {
		await context.store.addReducer( [ 'concierge' ], reducer );
	}

	// Scroll to the top
	if ( typeof window !== 'undefined' ) {
		window.scrollTo( 0, 0 );
	}

	let checklistMode = get( context, 'query.d' );
	if ( isRecentlyMigratedSite( state, siteId ) ) {
		checklistMode = 'migrated';
	}

	context.primary = <CustomerHome checklistMode={ checklistMode } key={ siteId } />;

	next();
}

export function maybeRedirect( context, next ) {
	const state = context.store.getState();
	const slug = getSelectedSiteSlug( state );
	if ( ! canCurrentUserUseCustomerHome( state ) ) {
		page.redirect( `/stats/day/${ slug }` );
		return;
	}
	next();
}
