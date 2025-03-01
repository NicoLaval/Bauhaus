import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Root from 'js/components/router';
import Error from 'js/components/shared/error/error';
import configureStore from 'js/store/configure-store';
import Api from 'js/remote-api/api';
import { I18NContext, BackToTop } from 'bauhaus-library';
import { bauhausLibraryDictionary } from 'js/i18n';

import 'app.scss';
import 'bauhaus-library/dist/index.css';

export const AppContext = createContext({});

Api.getInit()
	.then(
		res => (res.ok ? res.json() : Promise.reject(res.statusText)),
		err => {
			renderApp(Error, {}, { home: true });
			return Promise.reject(err.toString());
		}
	)
	.then(res => renderApp(Root, res));

const renderApp = (Component, initState, props) => {
	const { authType: type, lg1, lg2, ...properties } = initState;
	const store = configureStore({
		app: {
			auth: { type, user: { roles: [], stamp: '' } },
			lg1,
			lg2,
			properties,
			secondLang: false,
			error: false,
		},
	});

	ReactDOM.render(
		<Provider store={store}>
			<AppContext.Provider value={{ lg1, lg2 }}>
				<I18NContext.Provider value={bauhausLibraryDictionary}>
					<main>
						<Component {...props} />
						<BackToTop />
					</main>
				</I18NContext.Provider>
			</AppContext.Provider>
		</Provider>,
		document.getElementById('root')
	);
};
