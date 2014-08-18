import s = require("./Song");

export interface Station {
	StationName: string;
	ScraperName: string;
	ScraperParam?: string;
	Session: string;
	Disabled?: boolean;
	nowPlayingSong?: s.Song;
	lastPlayedSong?: s.Song; 
}