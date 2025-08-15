import { Model } from '@nozbe/watermelondb'
import { date, readonly, text } from '@nozbe/watermelondb/decorators'

export default class SavedVerseModel extends Model {
  static table = 'saved_verses'

  @text('user_id') userId!: string
  @text('book') book!: string
  @text('abbr') abbr!: string
  @text('chapter') chapter!: string
  @text('verse') verse!: string
  @text('version') version!: string
  @text('verse_text') verseText!: string
  @text('kind') kind!: 'highlight' | 'bookmark'
  @text('color') color!: string | null

  @readonly @date('created_at') createdAt!: Date
  @readonly @date('updated_at') updatedAt!: Date
}
