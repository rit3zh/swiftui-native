import { useWindowDimensions } from "react-native";
import React from "react";
import SwiftUI, {
  Color,
  ForEach,
  SystemColor,
  useSwiftUiEvent,
} from "swiftui-native";
import { truncate } from "../../utils";
import * as constants from "../../constants";

export const Playlist: React.FC = (): React.ReactNode => {
  const { height } = useWindowDimensions();

  useSwiftUiEvent("onSubmitText", (data: any) => {
    console.log(data);
  });

  useSwiftUiEvent("onChangeText", (data: any) => {
    console.log(data);
  });
  useSwiftUiEvent("onScopeChange", (data) => {
    console.log(data);
  });
  return (
    <SwiftUI.RootView>
      <SwiftUI.NavigationView
        searchSuggestions={[
          <SwiftUI.Label systemIconName="0.circle" text="HEY" />,
        ]}
        key={"onChangeText"}
        title={` ${constants.ALBUM_NAME}`}
        scopes={[<SwiftUI.Label systemIconName="person.fill" text="jhey" />]}
      >
        <SwiftUI.ScrollView toolbarPlacement="navigation">
          <SwiftUI.ToolbarItemGroup
            toolbarPlacement="navigation"
            titleDisplayMode="inline"
          >
            <SwiftUI.ActionSymbol
              systemIconName="plus"
              foregroundColor={Color.Red}
              backgroundHeight={30}
              backgroundWidth={30}
              actionBackgroundColor={SystemColor.SecondarySystemFill}
              cornerRadius={100}
              size={10}
            />
            <SwiftUI.ActionSymbol
              systemIconName="ellipsis"
              foregroundColor={Color.Red}
              backgroundHeight={30}
              backgroundWidth={30}
              actionBackgroundColor={SystemColor.SecondarySystemFill}
              cornerRadius={100}
              size={10}
            />
          </SwiftUI.ToolbarItemGroup>
          <SwiftUI.VStack paddingTop={15}>
            <SwiftUI.Image
              imageUrl={`https://f4.bcbits.com/img/a3726590002_10.jpg`}
              width={300}
              height={300}
            />
            <SwiftUI.VStack padding={10}>
              <SwiftUI.Text font="headline" fontWeight="bold" height={30}>
                {constants.ALBUM_NAME}
              </SwiftUI.Text>
              <SwiftUI.Text
                font="subheadline"
                fontWeight="regular"
                foregroundColor={Color.Red}
                height={20}
              >
                {constants.ARTIST_NAME}
              </SwiftUI.Text>
            </SwiftUI.VStack>
            <SwiftUI.LazyHStack>
              <SwiftUI.Text font="footnote" foregroundColor={Color.Gray}>
                Electronic・
              </SwiftUI.Text>
              <SwiftUI.Text font="footnote" foregroundColor={Color.Gray}>
                2021・
              </SwiftUI.Text>
              <SwiftUI.Label
                font="footnote"
                foregroundColor={Color.Gray}
                systemIconName="airpodspro"
                text="Dolby Atmos・"
              />
              <SwiftUI.Label
                font="footnote"
                foregroundColor={Color.Gray}
                systemIconName="waveform.path"
                text="Lossless"
              />
            </SwiftUI.LazyHStack>
            <SwiftUI.HStack height={100}>
              <SwiftUI.List>
                <SwiftUI.HStack>
                  <SwiftUI.Spacer />
                  <SwiftUI.Image
                    systemIconName="play.fill"
                    foregroundColor={Color.Red}
                    width={20}
                    height={20}
                  />
                  <SwiftUI.Text
                    foregroundColor={Color.Red}
                    paddingLeft={5}
                    fontWeight="medium"
                  >
                    Play
                  </SwiftUI.Text>
                  <SwiftUI.Spacer />
                </SwiftUI.HStack>
              </SwiftUI.List>
              <SwiftUI.List>
                <SwiftUI.HStack>
                  <SwiftUI.Spacer width={40} />
                  <SwiftUI.Image
                    systemIconName="shuffle"
                    foregroundColor={Color.Red}
                    width={20}
                    height={20}
                  />
                  <SwiftUI.Text
                    paddingLeft={-1}
                    foregroundColor={Color.Red}
                    fontWeight="medium"
                    width={70}
                  >
                    Shuffle
                  </SwiftUI.Text>
                  <SwiftUI.Spacer />
                </SwiftUI.HStack>
              </SwiftUI.List>
            </SwiftUI.HStack>
            <SwiftUI.Button key="" foregroundColor="">
              <SwiftUI.HStack verticalAlignment="bottom">
                <SwiftUI.Text
                  font="subheadline"
                  foregroundColor={SystemColor.SecondarySystemBackground}
                >
                  {truncate(constants.ALBUM_DESCRIPTION, { length: 100 })}
                </SwiftUI.Text>

                <SwiftUI.Text
                  paddingLeft={-10}
                  fontWeight="bold"
                  foregroundColor={Color.Red}
                  font="subheadline"
                >
                  MORE
                </SwiftUI.Text>
              </SwiftUI.HStack>
            </SwiftUI.Button>
          </SwiftUI.VStack>
          <SwiftUI.VStack padding={10}>
            <SwiftUI.Divider />
          </SwiftUI.VStack>

          <SwiftUI.List
            trailingSwipeActionFullSwipeEnable={true}
            leadingSwipeActions={[
              <SwiftUI.ListButton
                role="cancel"
                systemIconName="text.line.first.and.arrowtriangle.forward"
                text="Add to Library"
                tint={"#6137de"}
              />,
            ]}
            trailingSwipeActions={[
              <SwiftUI.ListButton
                role="cancel"
                systemIconName="plus"
                text="Add to Library"
                tint={"#1a1a1a"}
              />,
            ]}
            height={Math.min(constants.SONGS.length * 60, height - 200)}
            listStyle="inset"
          >
            <SwiftUI.Section
              sectionFooter={
                <SwiftUI.Text
                  font="caption"
                  foregroundColor={Color.Gray}
                  paddingTop={10}
                >
                  {constants.FOOTER_TEXT}
                </SwiftUI.Text>
              }
            >
              {ForEach(constants.SONGS, (song, index) => (
                <SwiftUI.HStack key={index}>
                  <SwiftUI.Text
                    font="callout"
                    foregroundColor={Color.Gray}
                    fontWeight="medium"
                    paddingRight={20}
                  >
                    {String(index + 1)}
                  </SwiftUI.Text>

                  <SwiftUI.Text font="subheadline">
                    {song.featuredArtist
                      ? `${song.title} (feat. ${song.featuredArtist})`
                      : song.title}
                  </SwiftUI.Text>
                  {song.explicit ? (
                    <SwiftUI.Image
                      systemIconName="e.square.fill"
                      foregroundColor={Color.Gray}
                      width={25}
                      height={25}
                      paddingLeft={10}
                    />
                  ) : null}

                  <SwiftUI.Spacer />
                  <SwiftUI.Image
                    systemIconName="ellipsis"
                    foregroundColor={Color.White}
                    width={15}
                    height={15}
                  />
                </SwiftUI.HStack>
              ))}
            </SwiftUI.Section>
          </SwiftUI.List>
        </SwiftUI.ScrollView>
      </SwiftUI.NavigationView>
    </SwiftUI.RootView>
  );
};
