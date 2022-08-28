import { Tag } from '@blueprintjs/core';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const SelectedLanguageTag = () => {
    const codeLangauge = useSelector((state: RootState) => {
        return state.editor.language.label;
      });
      
    return <Tag>{`Editor language: ${codeLangauge}`}</Tag>
};

export default SelectedLanguageTag;