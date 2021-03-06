// Locs have tags that interpolate into various things, colored text, images, text replacement ect.
// [[col:<color>]]<text>[[/col]] Colors the <text> to be <color> inside the tags
// [[overridecol:<color>]]<text>[[/overridecol]] Same as above?
// [[img:<image path>]][[/img]] inserts image at <image path>, some are path literals, some are just names, not sure where the names resolve to
// {{tr:<key>}} inserts text from (i think) the ui_text_replacements__.loc, these can contain more tags for interpolation
// [[sl:<key>]]<text>[[/sl]] ¯\_(ツ)_/¯ used somewhat in ui_text_replacements?
// [[sl_tooltip:<key>]]<text>[[/sl_tooltip]] ¯\_(ツ)_/¯ used somewhat in ui_text_replacements?
// [[url:<link>]]<text>[[/url]] Creates url
// [[tooltip:<key>]]<text>[[/tooltip]] Creates tooltip
// [[b]]<text>[[/b]] Bold?
// {{tt:key}} inserts text for tooltip, not sure from what table

// For the time being just does text replacement for {{tr}} tags, and returns whatever is inside [[]] tags

// Whoever at CA decided to not close random img tags, sometimes close overridecol with /col, and sometimes with /overridecol has my eternal regex hatred
const stringInterpolator = (string, uiTextReplacements, missingTextReplacements) => {
  if (!string.includes('[[') && !string.includes('{{')) {
    // Replacing this before going through the rest of string interpolator breaks element innertext checks at bottom.
    if (string.includes('\\\\n')) {
      string = string.replaceAll('\\\\n', '\n\t');
    }
    return string;
  }

  if (string.includes('{{')) {
    const tagR = string.match(/\{\{[a-zA-Z0-9:_./ ]*\}\}/);
    if (tagR === null) {
      undefined;
    }
    let cleanedKey = tagR[0].replace('{{tr:', '');
    cleanedKey = cleanedKey.replace('}}', '');
    const replacementText = uiTextReplacements.find((replacement) => {
      return replacement.key === `ui_text_replacements_localised_text_${cleanedKey}`;
    });
    if (replacementText === undefined) {
      missingTextReplacements.push(tagR[0]);
      string = string.replace(tagR[0], '!Missing!');
    } else {
      string = string.replace(tagR[0], replacementText.text);
    }
  }
  if (string.includes('[[')) {
    // Grab element within first tag and last tag of the same tagName
    const regex = new RegExp(/\[\[(?<tagName>[a-zA-Z_]*):?(?<tagAttribute>[a-zA-Z0-9_./ ]*)\]\](?<innerText>.*)\[\[\/\k<tagName>\]\]/);
    let element = string.match(regex);
    // If its an img they have empty innerText so we want the first instance of its closing tagName not the last.
    if (element?.groups.tagName === 'img') {
      element = string.match(/\[\[(?<tagName>[a-zA-Z_]*):(?<tagAttribute>[a-zA-Z0-9_./ ]*)\]\](?<innerText>)\[\[\/\k<tagName>\]\]/);
    }

    // Vanilla locs occasionally have opening img tags without closing tags that lead to a null element here z.z
    if (element === null) {
      element = string.match(/\[\[img:[a-zA-Z0-9_./ ]*\]\]/);
      // overridecol sometimes closes with /col and sometimes with /overridecol ._.
      if (element === null) {
        element = string.match(/\[\[overridecol:[a-zA-Z0-9_./ ]*\]\](?<innerText>.*)\[\[\/col\]\]/);
        // WH3 adds a bunch of col tags that arent closed by anything as well 🙃
        if (element === null) {
          element = string.match(/\[\[col:[a-zA-Z0-9_./ ]*\]\]/);
          // SFO also has literally bugged img tags such as [[img:icon_ap] (that also dont have closing tags cause why not) AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
          if (element === null) {
            element = string.match(/\[\[(?<tagName>[a-zA-Z_]*):[a-zA-Z0-9_./ ]*\](?<innerText>[^\]])/);
          }
        }
      }
    }

    let innerText;
    if (element.groups?.innerText === null || element.groups?.innerText === undefined) {
      innerText = '';
    } else if (element.groups.tagName === 'img' && element.groups.tagAttribute === 'icon_arrow_up') {
      innerText = '➕';
    } else if (element.groups.tagName === 'img' && element.groups.tagAttribute === 'icon_arrow_down') {
      innerText = '➖';
    } else {
      innerText = element.groups.innerText;
    }
    string = string.replace(element[0], innerText);
  }
  return stringInterpolator(string, uiTextReplacements, missingTextReplacements);
};

export default stringInterpolator;
