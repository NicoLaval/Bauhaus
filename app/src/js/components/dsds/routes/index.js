import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Menu from 'js/components/dsds/menu';
import Home from 'js/components/dsds/home';
import Visualization from 'js/components/dsds/visualization';
import { Create, Update } from 'js/components/dsds/edition';

import D from 'js/i18n';

export default () => {
	document.title = 'Bauhaus - ' + D.dsdsTitle;
	return (
		<>
			<Menu />
			<div className="container">
				<Switch>
					<Route exact path="/dsds" component={Home} />
					<Route exact path="/dsds/create" component={Create} />
					<Route exact path="/dsds/:dsdId/update" component={Update} />
					<Route exact path="/dsds/:dsdId" component={Visualization} />
				</Switch>
			</div>
		</>
	);
};
