
function Hero ({ hero }) {
  return (
    <table>
      <tbody>
        <tr>
          <td>{hero.hero_id}</td>
          <td>{hero.last_played}</td>
          <td>
            sum info {hero.games} {hero.win}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Hero;
