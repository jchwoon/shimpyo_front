import * as React from 'react';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import { debounce } from '@mui/material/utils';
import { Paper, PaperProps } from '@mui/material';

import { CustomizedTextfield } from './MobileNavbar.style';

import "./styles.css"

const CustomPaper = (props: PaperProps) => {
    return <Paper {...props} elevation={0} sx={{}} />
}

const GOOGLE_MAPS_API_KEY = 'AIzaSyA5ADsk4mK_A2hZuC2dSIHLpHGKFbixz88';

function loadScript(src: string, position: HTMLElement | null, id: string) {
    if (!position) {
        return;
    }

    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('id', id);
    script.src = src;
    position.appendChild(script);
}

const autocompleteService = { current: null };

interface MainTextMatchedSubstrings {
    offset: number;
    length: number;
}
interface StructuredFormatting {
    main_text: string;
    secondary_text: string;
    main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
}
interface PlaceType {
    description: string;
    structured_formatting: StructuredFormatting;
    types: string[]
}

interface MainTextMatchedSubstrings {
    offset: number;
    length: number;
}
interface StructuredFormatting {
    main_text: string;
    secondary_text: string;
    main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
}
interface PlaceType {
    description: string;
    structured_formatting: StructuredFormatting;
    types: string[]
}

interface GoogleMapsProps {
    placeholder: string;
    setPlaceholder: (value: string) => void;
    setPlaceholderChanged: (value: boolean) => void;
    textfieldInputValue: boolean
    setTextfieldInputValue: (value: boolean) => void;
    ObjectPlaceholder: PlaceType;
    setObjectPlaceholder: (value: PlaceType) => void
}

const GoogleMaps: React.FC<GoogleMapsProps> = ({
    placeholder,
    setPlaceholder,
    setPlaceholderChanged,
    textfieldInputValue,
    setTextfieldInputValue,
    ObjectPlaceholder,
    setObjectPlaceholder
}) => {
    const [value, setValue] = React.useState<PlaceType | null>(null);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState<readonly PlaceType[]>([]);
    const [open, setOpen] = React.useState<boolean>(false)
    const loaded = React.useRef(false);

    if (value) {
        setTextfieldInputValue(true)
    }
    if (textfieldInputValue === false && value && ObjectPlaceholder.description === '') {
        setValue(null)
    }

    if (typeof window !== 'undefined' && !loaded.current) {
        if (!document.querySelector('#google-maps')) {
            loadScript(
                `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
                document.querySelector('head'),
                'google-maps',
            );
        }

        loaded.current = true;
    }

    const fetch = React.useMemo(
        () =>
            debounce(
                (
                    request: { input: string },
                    callback: (results?: readonly PlaceType[]) => void,
                ) => {
                    (autocompleteService.current as any).getPlacePredictions(
                        {
                            ...request,
                            types: ['political'],
                            componentRestrictions: { country: 'kr' },
                        },
                        (results: PlaceType[]) => {
                            if (results) {
                                const filteredResults = results.filter(
                                    (place: PlaceType) => !(
                                        place.types.includes('sublocality_level_2') ||
                                        place.types.includes('sublocality_level_3') ||
                                        place.types.includes('sublocality_level_4'))
                                );
                                callback(filteredResults);
                            } else {
                                callback([]);
                            }
                        }
                    );
                },
                400,
            ),
        [],
    );

    React.useEffect(() => {
        let active = true;

        if (!autocompleteService.current && (window as any).google) {
            autocompleteService.current = new (
                window as any
            ).google.maps.places.AutocompleteService();
        }
        if (!autocompleteService.current) {
            return undefined;
        }

        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }

        fetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
            if (active) {
                let newOptions: readonly PlaceType[] = [];

                if (value) {
                    newOptions = [value];
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [value, inputValue, fetch]);

    return (
        <Autocomplete
            id="google-map-demo"
            sx={{
                width: "100%", borderColor: "white", "& .MuiAutocomplete-clearIndicator": {
                    display: "none", '& .MuiAutocomplete-endAdornment': {
                        display: 'none',
                    },
                },
            }}
            getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.description
            }
            filterOptions={(x) => x}
            options={options}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={value}
            noOptionsText={
                < Typography sx={{ fontFamily: "Noto Sans KR" }}> 여행지가 없습니다.</Typography >
            }

            PaperComponent={CustomPaper}

            onChange={(event: any, newValue: PlaceType | null) => {
                setOptions(newValue ? [newValue, ...options] : options);
                setValue(newValue);
                setPlaceholderChanged(true);
                if (newValue !== null) setObjectPlaceholder(newValue)
            }}

            open={open}
            onInputChange={(event, value) => {
                if (value.length === 0) {
                    if (open) setOpen(false);
                } else {
                    if (!open) setOpen(true);
                }

                setInputValue(value);
                // setPlaceholder(value);
            }}
            onClose={() => setOpen(false)}

            renderInput={(params) => (
                <CustomizedTextfield
                    {...params}
                    variant="outlined"
                    fullWidth
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: null
                    }}
                    placeholder={ObjectPlaceholder.description ? ObjectPlaceholder.description : "여행지 검색"}
                    sx={{ padding: "0px" }}
                />
            )}
            renderOption={(props, option) => {
                const matches =
                    option.structured_formatting.main_text_matched_substrings || [];

                const parts = parse(
                    option.structured_formatting.main_text,
                    matches.map((match: any) => [match.offset, match.offset + match.length]),
                );

                return (
                    <li {...props} style={{ paddingLeft: "0px" }} >
                        <Grid container alignItems="center" >
                            <Grid item sx={{ display: 'flex', width: 44 }}>
                                <LocationOnIcon sx={{ color: 'text.secondary' }} />
                            </Grid>
                            <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                                {parts.map((part, index) => (
                                    <Box
                                        key={index}
                                        component="span"
                                        sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                                    >
                                        {part.text}
                                    </Box>
                                ))}
                                <Typography variant="body2" color="text.secondary">
                                    {option.structured_formatting.secondary_text}
                                </Typography>
                            </Grid>
                        </Grid>
                    </li>
                );
            }}
        />
    );
}

export default GoogleMaps