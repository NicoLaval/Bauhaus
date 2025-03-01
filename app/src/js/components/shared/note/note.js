import React, { useContext } from 'react';
import Panel from 'js/components/shared/panel';
import NoteFlag from 'js/components/shared/note-flag/note-flag';
import { markdownToHtml } from 'js/utils/html';
import { ApplicationContext } from 'js/context';

export const Note = ({
	text = '',
	title,
	lang,
	alone,
	allowEmpty = false,
	md = false,
	context,
	alt = '',
}) => {
	const ctx = useContext(ApplicationContext) || context;
	const cl = alone ? 'col-md-12' : 'col-md-6';
	if (!text && !allowEmpty) return null;

	if (md) {
		return (
			<div className={cl} title={alt}>
				<Panel title={<NoteFlag text={title} lang={lang} />} context={ctx}>
					<div dangerouslySetInnerHTML={{ __html: markdownToHtml(text) }} />
				</Panel>
			</div>
		);
	}
	return (
		<div className={cl} title={alt}>
			<Panel title={<NoteFlag text={title} lang={lang} />} context={ctx}>
				{text}
			</Panel>
		</div>
	);
};
