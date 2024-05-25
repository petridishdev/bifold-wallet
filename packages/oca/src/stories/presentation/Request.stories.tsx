import { LocalizedAttribute, LocalizedCredential } from '@oca/formatters'
import { LocalizedCredentialContext } from '@oca/ui/contexts/localizedCredential'
import { Meta, StoryObj } from '@storybook/react'
import Request from '@ui/components/presentation/Request'

const meta = {
  title: 'Presentation/Request',
  component: () => {
    return <LocalizedCredentialContext.Provider
      value={
        {
          issuer: 'Government of British Columbia',
          name: 'Selling It Right',
          logo: 'https://raw.githubusercontent.com/bcgov/aries-oca-bundles/main/OCABundles/schema/bcgov-digital-trust/LCRB/selling-it-right/bc-logo.jpg',
          backgroundImageSlice:
            'https://www.responsibleservicebc.gov.bc.ca/files/static/bc_wallet_vc_lcrb_image_slice_sell_right.jpg',
          primaryBackgroundColor: '#003366',
          secondaryBackgroundColor: '#FCBC1E',
          watermark: 'NON-PRODUCTION',
          attributes: [{
            name: 'name',
            label: 'Name',
            // value: 'John Doe',
            type: 'string',
          } as Partial<LocalizedAttribute>, {
            name: 'email',
            label: 'Email',
            // value: 'asdf@asdf.com',
            type: 'string',
          } as Partial<LocalizedAttribute>],
        } as LocalizedCredential
      }
    >
      <Request />
    </LocalizedCredentialContext.Provider>
  },
  parameters: {
    layout: 'padded',
  },
} as Meta<typeof Request>

export default meta

type Story = StoryObj<typeof Request>

export const Default = {} as Story
