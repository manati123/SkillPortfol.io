import { useMemo } from 'react';
import { IUserJourney } from 'scripts/models/Journey/IUserJourney';
import { getAuxJourneys } from 'scripts/utils/utils';

export function apiAux() {
    return { getJourneys };

    function getJourneys(searchText?: string): IUserJourney[] {
        const journeysAux = getAuxJourneys();
        return searchText ? journeysAux.filter(i => i.Title.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) > -1) : journeysAux;
    }
}