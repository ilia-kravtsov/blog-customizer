import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from 'components/article/index';
import { ArticleParamsForm } from 'components/article-params-form/index';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [app, setApp] = useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': app.fontFamilyOption.value,
					'--font-size': app.fontSizeOption.value,
					'--font-color': app.fontColor.value,
					'--container-width': app.contentWidth.value,
					'--bg-color': app.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setApp={setApp} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
