import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useState } from 'react';
import { clsx } from 'clsx';
import {
	backgroundColors,
	fontColors,
	contentWidthArr,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator/index';

type TArticleParamsForm = {
	setApp: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ setApp }: TArticleParamsForm) => {
	const [isFormOpened, setIsFormOpened] = useState<boolean>(false);
	const [form, setForm] = useState<ArticleStateType>(defaultArticleState);

	const handleFormOpener = () => {
		setIsFormOpened(!isFormOpened);
	};

	const handleChange = (fieldName: string) => {
		return (value: OptionType) => {
			setForm((prev) => ({ ...prev, [fieldName]: value }));
		};
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setApp(form);
	};

	const handleReset = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setForm(defaultArticleState);

		setApp(defaultArticleState);
	};

	const handleOverlayOpener = () => {
		setIsFormOpened(false);
	};

	const overlayStyles = clsx(styles.overlay, {
		[styles.overlay_open]: isFormOpened,
	});

	const asideStyles = clsx(styles.container, {
		[styles.container_open]: isFormOpened,
	});

	return (
		<>
			<ArrowButton isOpen={isFormOpened} onClick={handleFormOpener} />
			<div onClick={handleOverlayOpener} className={overlayStyles} />
			<aside className={asideStyles}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={form.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleChange('fontFamilyOption')}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='fontSizeOption'
						selected={form.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleChange('fontSizeOption')}
					/>
					<Select
						title='Цвет шрифта'
						selected={form.fontColor}
						options={fontColors}
						onChange={handleChange('fontColor')}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={form.backgroundColor}
						options={backgroundColors}
						onChange={handleChange('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						selected={form.contentWidth}
						options={contentWidthArr}
						onChange={handleChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
