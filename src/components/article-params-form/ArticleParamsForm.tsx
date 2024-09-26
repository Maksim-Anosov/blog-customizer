import React, { MutableRefObject } from 'react';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from '../radio-group';
import { Text } from '../text';
import { Select } from '../select';
import { Separator } from '../separator';
import { useClickAway } from '@uidotdev/usehooks';

import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	appState: ArticleStateType;
	setAppState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	appState,
	setAppState,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const [formState, setFormState] = React.useState<ArticleStateType>(appState);

	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setAppState(formState);
		setIsMenuOpen(false);
	};

	const handleFormReset = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setAppState(defaultArticleState);
		setFormState(defaultArticleState);
		setIsMenuOpen(false);
	};

	const ref: MutableRefObject<HTMLElement> | null = useClickAway(() =>
		setIsMenuOpen(false)
	);

	React.useEffect(() => {
		function closeByEscape(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				setIsMenuOpen(false);
			}
		}

		if (isMenuOpen) {
			document.addEventListener('keydown', closeByEscape);
			return () => document.removeEventListener('keydown', closeByEscape);
		}
	}, [isMenuOpen]);

	return (
		<>
			<ArrowButton
				isMenuOpen={isMenuOpen}
				onClick={() => setIsMenuOpen(!isMenuOpen)}
			/>
			<aside
				className={clsx(styles.container, isMenuOpen && styles.container_open)}
				ref={ref}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleFormReset}>
					<Text weight={800} uppercase as={'h3'} size={31}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(selected) =>
							setFormState({ ...formState, fontFamilyOption: selected })
						}
						style={{ marginTop: 50 }}
					/>
					<RadioGroup
						title={'Размер шрифта'}
						name={'Размер шрифта'}
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(selected) =>
							setFormState({ ...formState, fontSizeOption: selected })
						}
						style={{ marginTop: 50 }}
					/>
					<Select
						title={'Цвет шрифта'}
						selected={formState.fontColor}
						options={fontColors}
						onChange={(selected) =>
							setFormState({ ...formState, fontColor: selected })
						}
						style={{ marginTop: 50 }}
					/>
					<Separator />
					<Select
						title={'Цвет фона'}
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(selected) =>
							setFormState({ ...formState, backgroundColor: selected })
						}
						style={{ marginTop: 50 }}
					/>
					<Select
						title={'Ширина контента'}
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(selected) =>
							setFormState({ ...formState, contentWidth: selected })
						}
						style={{ marginTop: 50 }}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
