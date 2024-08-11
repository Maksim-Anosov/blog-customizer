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
	const [isOpen, setIsOpen] = React.useState(false);
	const [formState, setFormState] = React.useState<ArticleStateType>(appState);

	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setAppState(formState);
		setIsOpen(false);
	};

	const handleFormReset = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setAppState(defaultArticleState);
		setFormState(defaultArticleState);
		setIsOpen(false);
	};

	const ref: MutableRefObject<HTMLElement> | null = useClickAway(() =>
		setIsOpen(false)
	);

	React.useEffect(() => {
		document.addEventListener('keydown', (event) => {
			if (event.key === 'Escape') {
				setIsOpen(false);
			}
		});

		return () => {
			document.removeEventListener('keydown', (event) => {
				if (event.key === 'Escape') {
					setIsOpen(false);
				}
			});
		};
	}, [isOpen]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}
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
