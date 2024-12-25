- tokens

  - otp
  - token
  - token_type
  - expires
  - user
  - is_blacklisted
  - is_used

- users

  - first_name --- [filter search][$regx]
  - last_name --- [filter search][$regx]
  - username --- [filter search][$regx]
  - email --- [filter search][$regx]
  - password
  - role -- 'admin' | 'user' --- [filter][$in]
  - image
  - metamask --- [filter][$eq] ----------done [/users?metamask=asdf54sf5]
  - playstation --- [filter][$eq]
  - xbox --- [filter][$eq]
  - stream --- [filter][$eq]
  - is_email_verified --- [filter][$eq]
  - status -- 'active' | 'inactive' | 'pending' | 'suspended' --- [filter][$in]
  - oauth[]
    - id
    - provider
  - stats --- [virtual]
    - total_participated
    - total_win
    - total_amount_win

- blogs

  - title --- [filter search][$regx] -------------------done
  - sub_title --- [filter search][$regx] ---------------done
  - description --- [filter search][$regx] -------------done
  - featured_image
  - cover_image
  - category --- [filter][$in] [populate] ------done
  - slug
  - status -- 'publish' | 'draft' | 'pending' | 'trash' | 'private' --- [filter][$in] -----------done [/blogs?status=draft,pending]
  - comment_count --- [virtual]----------done [/blogs?populate=comment_count]

- communities

  - title --- [filter search][$regx] ---------done [/communities?search=rainy]
  - description --- [filter search][$regx] ---------done [/communities?search=funny]
  - featured_image
  - category --- [filter][$in] [populate] ---------------done
  - slug
  - user
  - status -- 'publish' | 'draft' | 'pending' | 'trash' | 'private' --- [filter][$in] ------------done [/communities?status=draft,pending]

  <!-- /communities?populate=total_likes,comment_count,last_activity,total_dislikes,user -->

  - comment_count --- [virtual]
  - last_activity --- [virtual]
  - total_likes --- [virtual]
  - total_dislikes --- [virtual]
  - my_action --- [virtual]

- categories

  - title
  - description
  - featured_image
  - slug
  - reference_type -- 'Community' | 'Blog' --- [filter][$in] -----done [/categories?reference_type=Blog]
  - status -- 'publish' | 'draft' | 'pending' | 'trash' | 'private' --- [filter][$in] --------done [/categories?status=draft,pending,publish]

- comments

  - text
  - reply
  - reference
  - reference_type -- 'Community' | 'Blog' --- [filter][$in] -----------done [/comments?reference_type=Community,Blog]

  - status -- 'publish' | 'draft' | 'pending' | 'trash' | 'private' --- [filter][$in] -------done [/comments?status=draft]

  <!-- [/comments?populate=total_likes,total_dislikes,user] -->

  - user --- [filter][$eq] [populate] ----------done
  - total_likes --- [virtual] ----------done
  - total_dislikes --- [virtual] ----------done

- actions

  - reference
  - reference_type -- 'Comment' | 'Blog' | 'Community'
  - user
  - action_type -- 'like' | 'dislike'

- events

  - game_id --- [filter][$in] ---------done
  - trophies
  - title --- [filter search][$regx] -------done
  - description --- [filter search][$regx] -------done
  - featured_image
  - cover_image
  - trophies[]
  - price
  - type -- 'tournament' --- [filter][$in] -------done
  - tier -- 'platinum' | 'gold' | 'silver' | 'bronze' --- [filter][$in] ----------done
  - platform -- 'xbox' --- [filter][$in] ---------done
  - start_date
  - end_date
  - user --- [filter][$eq] -----done [/events?user=670ce6676696835deea1461c]
  - event_status -- 'completed' | 'ongoing' | 'upcoming' --- [filter][$in] -----------done [/events?event_status=ongoing]
  - status -- 'publish' | 'draft' | 'pending' | 'trash' | 'private' --- [filter][$in] ------done [events?status=publish]
  - participants --- [virtual] ----------done [/events?participants=6710e615a720dd338c18b9f8]
  - participant_status --- [virtual] ----------done

- participants

  - event --- [filter][$eq] [populate] -----done [/participants?event=670ce6676696835deea1461c]
  - user --- [filter][$eq] [populate] ----done [{{server}}/participants?user=670ce6676696835deea1461c]
  - amount
  - winning_time
  - event_title --- [filter search][$regx]
  - event_trophies[] --- [filter search][$regx]
  - status -- 'participated' | 'leaved' | 'removed' --- [filter][$in]--------done [{{server}}/participants?status=participated]
  - claim_request -- 'approved' | 'pending' | 'rejected' | 'none' --- [filter][$in] ----done [/participants?claim_request=approved]
  - event_status_history[]
    - message
    - user
    - date
  - transaction --- [virtual] --------done

- transactions

  - participant
  - event --- [filter][$eq] [populate] ----done
  - user --- [filter][$eq] [populate] ----done
  - amount
  - metamask
  - tid
  - status -- 'successful' | 'failed' | 'rejected' | 'cancelled' | 'refunded' | 'pending' --- [filter][$in] -----done

  - history[]
    - message
    - user
    - date

- media

  - sid
  - name
  - size
  - type -- 'image/png' | 'image/jpeg' | 'image/webp' ...
  - user --- [filter][$eq]
  - status -- 'publish' | 'draft' | 'pending' | 'trash' | 'private' --- [filter][$in] ----------done [/media?status=trash]

- notifications

  - title
  - description
  - user --- [filter][$eq] ---------done
  - reading_time
  - status -- 'publish' | 'draft' | 'pending' | 'trash' | 'private' --- [filter][$in] ----------done

- meta \*

  - key
  - value

- faqs \*

  - title
  - description

- views \*

  - user
  - reference
  - reference_type -- 'Community' | 'Blog' | 'Event'

user -] metamask connect btn -] store in user collection -]

how to determine that a user has earn/win the event from third party?

user block

## Class: RewardClaim

## Attributes:

- ClaimID: string
- UserID: string
- EventID: string
- Amount: number
- Status: string // (e.g., "Pending", "Approved", "Rejected")
- CreatedAt: Date
- ApprovedAt: Date (nullable)

- transactions

  - tid
  - amount
  - type -- 'debit' | 'credit'
  - reference
  - reference_type -- 'Event'
  - notes[]
    - text
    - createdAt

Class: Wallet
Attributes:

---

- UserID: string
- balance: number
- currency : enum ['lte','USD']
-
- convertion_rate:

## Class: Notifications

- NotificationType: string
- Description: string
- Creator: User
- CreatedAt: Date

---

Flow claim Request:
User will create claim request:
admin will get to see all of the claim request and filter it with event type

admin can either reject or aprove claim request.
once admin will accept

transaction will create
and this transaction amount will be added with wallet balance

user will be able to see final balance and he can withdraw it.
