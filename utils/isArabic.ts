


class isArabic {
    static validate({ word }: { word: string  }) {
        if(!word) return false;
        if(typeof word != "string") return false;

        const SpaceRegEx = /[\t\n\v\f\r \u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000]/
        
        if (word.length > 1 ) {
            return !word.split("")
              .map((char) => (this.isArabic(char) || char.match(SpaceRegEx) ? "" : "N"))
              .join("")
              .toString()
        }
        


        
        return this.isArabic(word)
    }
    private static  isArabic(char: string) {
        let AR = /^([\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufbc1]|[\ufbd3-\ufd3f]|[\ufd50-\ufd8f]|[\ufd92-\ufdc7]|[\ufe70-\ufefc]|[\ufdf0-\ufdfd])*$/g;
        return char.match(AR)
    }
}



export default isArabic;